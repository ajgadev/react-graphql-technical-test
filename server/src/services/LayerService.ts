import { singleton } from "tsyringe";
import { Context } from "../models/Context";
import { Project } from "../models/Project";
import { DuplicateLayerInput } from "../models/types/DuplicateLayerInput";
import { v4 as uuidv4 } from "uuid";

@singleton()
export class LayerService {
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

    async removeLayer(input: DuplicateLayerInput, context: Context): Promise<Project> {
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

        component.layers = component.layers?.filter(l => l.id !== input.layerId);
    
        await context.dataSources?.projectDatasource.saveProject(project);
    
        return project;
    }
}