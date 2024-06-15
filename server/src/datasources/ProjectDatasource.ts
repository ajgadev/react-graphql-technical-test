import { DataSource } from "apollo-datasource";
import { Project } from "../models/Project";
import projects from "./mock/projectsData.json";
import { ProjectRequestFilter } from "../models/types/ProjectRequestFilter";

export class ProjectDatasource extends DataSource {
  constructor() {
    super();
  }

  async findProjects(filters: ProjectRequestFilter): Promise<Project[]> {
    const projectsData: Project[] = projects.filter((project) => {
      if (filters.name && !project.name.includes(filters.name)) {
        return false;
      }
      if (filters.key && project.key !== filters.key) {
        return false;
      }
      return true;
    });
    return Promise.resolve(projectsData);
  }
  
  async findProjectById(id: string): Promise<Project | undefined> {
    const projectsData: Project[] = projects.filter((project) => {
      if (project.id === id) {
        return true;
      }
      return false;
    });
    return Promise.resolve(projectsData.length ? projectsData[0] : undefined);
  }

  async saveProject(project: Project): Promise<Project> {
    // Replace project with updated data
    const updatedProject = projects.find((p) => p.id === project.id);
    if (updatedProject) {
      Object.assign(updatedProject, project);
    }
    return Promise.resolve(project);
  }
}
