import { singleton } from "tsyringe";
import { Context } from "../models/Context";
import { Project } from "../models/Project";
import { v4 as uuidv4 } from "uuid";
import { ProjectService } from "./ProjectService";
import { DuplicatePackagingInput } from "../models/types/packaging/DuplicatePackagingInput";
import { UpdatePackagingInput } from "../models/types/packaging/UpdatePackagingInput";
import { CreatePackagingInput } from "../models/types/packaging/CreatePackagingInput";

@singleton()
export class PackagingService {
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
          position: project.packagings?.length || 0,
        };
    
        if (project.packagings) {
          project.packagings.push(newPackaging);
        } else {
          project.packagings = [newPackaging];
        }

        const newProject = ProjectService.transformProject(project);
    
        await context.dataSources?.projectDatasource.saveProject(newProject);
    
        return newProject;
    }

    async removePackaging(input: DuplicatePackagingInput, context: Context): Promise<Project> {
        const project = await context.dataSources?.projectDatasource.findProjectById(input.projectId);
        if (!project) {
          throw new Error(`Project with ID ${input.projectId} not found.`);
        }
    
        const packaging = project.packagings?.find(p => p.id === input.packagingId);
        if (!packaging) {
          throw new Error(`Packaging with ID ${input.packagingId} not found.`);
        }

        project.packagings = project.packagings?.filter(p => p.id !== input.packagingId);
    
        const newProject = ProjectService.transformProject(project);
        
        await context.dataSources?.projectDatasource.saveProject(newProject);

        return newProject;
    }

    async updatePackaging(input: UpdatePackagingInput, context: Context): Promise<Project> {
        const project = await context.dataSources?.projectDatasource.findProjectById(input.projectId);
        if (!project) {
          throw new Error(`Project with ID ${input.projectId} not found.`);
        }
    
        const packaging = project.packagings?.find(p => p.id === input.packagingId);
        if (!packaging) {
          throw new Error(`Packaging with ID ${input.packagingId} not found.`);
        }
    
        // Update packaging fields
        if (input.packagingInfo.name !== undefined) {
          packaging.name = input.packagingInfo.name;
        }
        if (input.packagingInfo.height !== undefined) {
          packaging.height = input.packagingInfo.height;    
        }
        if (input.packagingInfo.volume !== undefined) {
          packaging.volume = input.packagingInfo.volume;    
        }
        if (input.packagingInfo.length !== undefined) {
          packaging.length = input.packagingInfo.length;
        }
        if (input.packagingInfo.width !== undefined) {
          packaging.width = input.packagingInfo.width;
        }
        if (input.packagingInfo.packagingType !== undefined) {
            packaging.packagingType = input.packagingInfo.packagingType;
        }

        // Save updated packaging
        const newProject = ProjectService.transformProject(project);
        await context.dataSources?.projectDatasource.saveProject(newProject);
        return newProject;
    }

    async createPackaging(input: CreatePackagingInput, context: Context): Promise<Project> {
        const project = await context.dataSources?.projectDatasource.findProjectById(input.projectId);
        if (!project) {
          throw new Error(`Project with ID ${input.projectId} not found.`);
        }
    
        // TODO: Verify that the data is correct (?)
        const newPackaging = {
            ...input.packagingInfo,
            id: `packaging:${uuidv4()}`,
            components: [],
            position: project.packagings?.length || 0
        };

        if (project.packagings) {
            project.packagings.push(newPackaging);
        } else {
            project.packagings = [newPackaging];
        }

        const newProject = ProjectService.transformProject(project);
    
        await context.dataSources?.projectDatasource.saveProject(newProject);
    
        return newProject;
    }
}