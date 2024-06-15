import { ProjectDatasource } from "../datasources/ProjectDatasource";

export type AppDataSources = {
  projectDatasource: ProjectDatasource;
};

export class Context {
  dataSources?: AppDataSources;
}
