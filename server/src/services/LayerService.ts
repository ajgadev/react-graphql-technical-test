import { singleton } from "tsyringe";
import { Context } from "../models/Context";
import { Project } from "../models/Project";
import { DuplicateLayerInput } from "../models/types/layer/DuplicateLayerInput";
import { UpdateLayerInput } from "../models/types/layer/UpdateLayerInput";
import { v4 as uuidv4 } from "uuid";
import { ProjectService } from "./ProjectService";
import { CreateLayerInput } from "../models/types/layer/CreateLayerInput";

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
            position: component.layers?.length || 0,
        };

        if (component.layers) {
            component.layers.push(newLayer);
        } else {
            component.layers = [newLayer];
        }

        const newProject = ProjectService.transformProject(project);
        
        await context.dataSources?.projectDatasource.saveProject(newProject);

        return newProject;
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
    
        const newProject = ProjectService.transformProject(project);
        
        await context.dataSources?.projectDatasource.saveProject(newProject);

        return newProject;
    }

    async updateLayer(input: UpdateLayerInput, context: Context): Promise<Project> {
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

        // TODO: Verify that the data is correct (?)
        if (input.layerInfo.name !== undefined) {
          layer.name = input.layerInfo.name;
        }
        if (input.layerInfo.layerType !== undefined) {
          layer.layerType = input.layerInfo.layerType;
        }
        if (input.layerInfo.materialKey !== undefined) {
          layer.materialKey = input.layerInfo.materialKey;
        }
        if (input.layerInfo.visibleOuterLayer !== undefined) {
          layer.visibleOuterLayer = input.layerInfo.visibleOuterLayer;
        }
        if (input.layerInfo.density !== undefined) {
          layer.density = input.layerInfo.density;
        }
        if (input.layerInfo.weight !== undefined) {
          layer.weight = input.layerInfo.weight;
        }

        const newProject = ProjectService.transformProject(project);
        
        await context.dataSources?.projectDatasource.saveProject(newProject);

        return newProject;
    }

    async createLayer(input: CreateLayerInput, context: Context): Promise<Project> {
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

        // TODO: Verify that the data is correct (?)
        const newLayer = {
            ...input.layerInfo,
            id: `layer:${uuidv4()}`,
            position: component.layers?.length || 0
        };

        if (component.layers) {
            component.layers.push(newLayer);
        } else {
            component.layers = [newLayer];
        }

        const newProject = ProjectService.transformProject(project);
        
        await context.dataSources?.projectDatasource.saveProject(newProject);

        return newProject;
    }
}