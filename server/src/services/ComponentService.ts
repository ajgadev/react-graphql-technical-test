import { singleton } from "tsyringe";
import { Context } from "../models/Context";
import { Project } from "../models/Project";
import { v4 as uuidv4 } from "uuid";
import { DuplicateComponentInput } from "../models/types/DuplicateComponentInput";
import { ProjectService } from "./ProjectService";

@singleton()
export class ComponentService {
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
            position: packaging.components?.length || 0
        };

        if (packaging.components) {
            packaging.components.push(newComponent);
        } else {
            packaging.components = [newComponent];
        }

        await context.dataSources?.projectDatasource.saveProject(project);

        return project;
    }

    async removeComponent(input: DuplicateComponentInput, context: Context): Promise<Project> {
        const project = await context.dataSources?.projectDatasource.findProjectById(input.projectId);
        if (!project) {
          throw new Error(`Project with ID ${input.projectId} not found.`);
        }
    
        const packaging = project.packagings?.find(p => p.id === input.packagingId);
        if (!packaging) {
          throw new Error(`Packaging with ID ${input.packagingId} not found.`);
        }

        packaging.components = packaging.components?.filter(c => c.id !== input.componentId);
    
        const newProject = ProjectService.transformProject(project);
        
        await context.dataSources?.projectDatasource.saveProject(newProject);

        return newProject;
    }
}