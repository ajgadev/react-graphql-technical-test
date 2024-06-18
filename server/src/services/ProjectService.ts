import { singleton } from "tsyringe";
import { Context } from "../models/Context";
import { Project } from "../models/Project";
import { ProjectRequestFilter } from "../models/types/ProjectRequestFilter";
import { UpdateProjectInput } from "../models/types/UpdateProjectInput";
import { DuplicateComponentInput } from "../models/types/component/DuplicateComponentInput";
import { DuplicatePackagingInput } from "../models/types/packaging/DuplicatePackagingInput";
import { v4 as uuidv4 } from "uuid";

@singleton()
export class ProjectService {
  async getProject(id: string, context: Context): Promise<Project | undefined> {
    let project = await context.dataSources?.projectDatasource.findProjectById(id);
    if (project) {
      project = ProjectService.transformProject(project);
    }
    return project;
  }

  async getProjects(filter: ProjectRequestFilter = {}, context: Context): Promise<Project[]> {
    const projects = await context.dataSources?.projectDatasource.findProjects(filter);
    const formattedProjects = projects?.map(project => ProjectService.transformProject(project));
    return formattedProjects || [];
  }

  async updateProject(input: UpdateProjectInput, context: Context): Promise<Project> {
    const project = await context.dataSources?.projectDatasource.findProjectById(input.projectId);
    if (!project) {
      throw new Error(`Project with ID ${input.projectId} not found.`);
    }
    // Update project fields
    if (input.name !== undefined) {
      project.name = input.name;
    }
    ProjectService.weightCalculation(project);
    // Save updated project
    await context.dataSources?.projectDatasource.saveProject(project);

    return project;
  }

  private static weightCalculation(project: Project): void {
    this.calculateProjectWeights(project);
    this.calculateWeightFractions(project);
  }

  private static calculateProjectWeights(project: Project): void {
    project.packagings?.forEach(packaging => {
      packaging.components?.forEach(component => {
        component.weight = component.layers?.reduce((sum, layer) => sum + (layer.weight || 0), 0) || 0;
      });
      packaging.weight = packaging.components?.reduce((sum, component) => sum + (component.weight || 0), 0) || 0;
    });
  }

  private static calculateWeightFractions(project: Project): void {
    project.packagings?.forEach(packaging => {
      const totalPackagingWeight = packaging.weight || 1;
      packaging.components?.forEach(component => {
        component.layers?.forEach(layer => {
          layer.weightFraction = ((layer.weight || 0) / totalPackagingWeight) * 100;
        });
      });
    });
  }

  static transformProject(project: Project): Project {
    if (!project) return project;
    const newProject = {
      ...project,
      packagings: project.packagings?.map(packaging => {
        const newPackaging = {
          ...packaging,
          components: packaging.components?.map(component => {
            const newComponent = {
              ...component,
              layers: component.layers?.map(layer => {
                const newLayer = {
                  ...layer,
                  // weightFraction: layer.weightFraction || 0,
                };
                return newLayer;
              })
            };
            return newComponent;
          })
        };
        return newPackaging;
      })
    };
    this.weightCalculation(newProject);
    return newProject;
  }
}
