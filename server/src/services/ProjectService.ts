import { singleton } from "tsyringe";
import { Context } from "../models/Context";
import { Project } from "../models/Project";
import { ProjectRequestFilter } from "../models/types/ProjectRequestFilter";
import { UpdateProjectInput } from "../models/types/UpdateProjectInput";
import { DuplicateComponentInput } from "../models/types/DuplicateComponentInput";
import { DuplicatePackagingInput } from "../models/types/DuplicatePackagingInput";
import { DuplicateLayerInput } from "../models/types/DuplicateLayerInput";
import { v4 as uuidv4 } from "uuid";

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

  async duplicateLayer(input: DuplicateLayerInput, context: Context): Promise<Project> {
    const project = await context.dataSources?.projectDatasource.findProjectById(input.projectId);
    if (!project) {
      throw new Error(`Project with ID ${input.projectId} not found.`);
    }

    const packaging = project.packagings?.find(p => p.id === input.packagingId);
    if (!packaging) {
      throw new Error(`Packaging with ID ${input.packagingId} not found.`);
    }

    const component = packaging.components?.find(c => c.id === input.componentId);
    if (!component) {
      throw new Error(`Component with ID ${input.componentId} not found.`);
    }

    const layer = component.layers?.find(l => l.id === input.layerId);
    if (!layer) {
      throw new Error(`Layer with ID ${input.layerId} not found.`);
    }

    const newLayer = {
      ...layer,
      id: `layer:${uuidv4()}`,
    };

    if (component.layers) {
      component.layers.push(newLayer);
    } else {
      component.layers = [newLayer];
    }

    await context.dataSources?.projectDatasource.saveProject(project);

    return project;
  }

  async duplicateComponent(input: DuplicateComponentInput, context: Context): Promise<Project> {
    const project = await context.dataSources?.projectDatasource.findProjectById(input.projectId);
    if (!project) {
      throw new Error(`Project with ID ${input.projectId} not found.`);
    }

    const packaging = project.packagings?.find(p => p.id === input.packagingId);
    if (!packaging) {
      throw new Error(`Packaging with ID ${input.packagingId} not found.`);
    }

    const component = packaging.components?.find(c => c.id === input.componentId);
    if (!component) {
      throw new Error(`Component with ID ${input.componentId} not found.`);
    }

    const newComponent = {
      ...component,
      id: `component:${uuidv4()}`,
      layers: component.layers?.map(layer => ({ ...layer, id: `layer:${uuidv4()}` })),
    };

    if (packaging.components) {
      packaging.components.push(newComponent);
    } else {
      packaging.components = [newComponent];
    }

    await context.dataSources?.projectDatasource.saveProject(project);

    return project;
  }

  async duplicatePackaging(input: DuplicatePackagingInput, context: Context): Promise<Project> {
    const project = await context.dataSources?.projectDatasource.findProjectById(input.projectId);
    if (!project) {
      throw new Error(`Project with ID ${input.projectId} not found.`);
    }

    const packaging = project.packagings?.find(p => p.id === input.packagingId);
    if (!packaging) {
      throw new Error(`Packaging with ID ${input.packagingId} not found.`);
    }

    const newPackaging = {
      ...packaging,
      id: `packaging:${uuidv4()}`,
      components: packaging.components?.map(component => ({
        ...component,
        id: `component:${uuidv4()}`,
        layers: component.layers?.map(layer => ({ ...layer, id: `layer:${uuidv4()}` })),
      })),
    };

    if (project.packagings) {
      project.packagings.push(newPackaging);
    } else {
      project.packagings = [newPackaging];
    }

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
