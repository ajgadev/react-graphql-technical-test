import { GraphQLError } from "graphql";
import { container } from "tsyringe";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Context } from "../models/Context";
import { Project } from "../models/Project";
import { ProjectService } from "../services/ProjectService";
import { ProjectRequestFilter } from "../models/types/ProjectRequestFilter";
import { validate } from "class-validator";
import { UpdateProjectInput } from "../models/types/UpdateProjectInput";

@Resolver(Project)
export class ProjectResolver {
  readonly projectService: ProjectService;

  constructor() {
    this.projectService = container.resolve(ProjectService);
  }

  @Query(() => Project)
  async project(@Arg("id") id: string, @Ctx() context: Context) {
    const project = await this.projectService.getProject(id, context);
    if (project === undefined) {
      // throw new GraphQLError(id);
      throw new GraphQLError('Project not found');
    }
    return project;
  }

  @Query(() => [Project])
  async projects(@Arg("filter", () => ProjectRequestFilter, {nullable: true}) filter: ProjectRequestFilter, @Ctx() context: Context) {
    return this.projectService.getProjects(filter, context);
  }

  @Mutation(() => Project)
  async updateProject(@Arg("input") input: UpdateProjectInput, @Ctx() context: Context): Promise<Project> {
    // Validate input using class-validator
    const errors = await validate(input);
    if (errors.length > 0) {
      // Log validation errors
      const errorMessages = errors
        .map(error => Object.values(error.constraints ?? {}).join(', '))
        .join(', ');
      throw new GraphQLError(`Validation error: ${errorMessages}`);
    }
    // Call service method to update project
    const updatedProject = await this.projectService.updateProject(input, context);
    return updatedProject;
  }
}
