import { singleton } from "tsyringe";
import { Context } from "../models/Context";
import { Project } from "../models/Project";
import { ProjectRequestFilter } from "../models/types/ProjectRequestFilter";
import { UpdateProjectInput } from "../models/types/UpdateProjectInput";

@singleton()
export class ProjectService {
  async getProject(id: string, context: Context): Promise<Project | undefined> {
    const project = await context.dataSources?.projectDatasource.findProjectById(id);
    if (project) {
      this.weightCalculation(project);
    }
    return project;
  }

  async getProjects(filter: ProjectRequestFilter = {}, context: Context): Promise<Project[]> {
    const projects = await context.dataSources?.projectDatasource.findProjects(filter);
    if (projects) {
      projects.forEach(project => {
        this.weightCalculation(project);
      });
    }
    return projects || [];
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
    this.weightCalculation(project);
    // Save updated project
    await context.dataSources?.projectDatasource.saveProject(project);

    return project;
  }

  private weightCalculation(project: Project): void {
    this.calculateProjectWeights(project);
    this.calculateWeightFractions(project);
  }

  private calculateProjectWeights(project: Project): void {
    project.packagings?.forEach(packaging => {
      packaging.components?.forEach(component => {
        component.weight = component.layers?.reduce((sum, layer) => sum + (layer.weight || 0), 0) || 0;
      });
      packaging.weight = packaging.components?.reduce((sum, component) => sum + (component.weight || 0), 0) || 0;
    });
  }

  private calculateWeightFractions(project: Project): void {
    project.packagings?.forEach(packaging => {
      const totalPackagingWeight = packaging.weight || 1;
      packaging.components?.forEach(component => {
        component.layers?.forEach(layer => {
          layer.weightFraction = ((layer.weight || 0) / totalPackagingWeight) * 100;
        });
      });
    });
  }
}
