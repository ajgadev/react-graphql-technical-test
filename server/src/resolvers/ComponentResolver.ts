import { container } from "tsyringe";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Context } from "../models/Context";
import { Project } from "../models/Project";
import { PackagingComponent } from "../models/PackagingComponent";
import { ComponentService } from "../services/ComponentService";
import { DuplicateComponentInput } from "../models/types/component/DuplicateComponentInput";
import { UpdateComponentInput } from "../models/types/component/UpdateComponentInput";
import { CreateComponentInput } from "../models/types/component/CreateComponentInput";

@Resolver(PackagingComponent)
export class ComponentResolver {
    readonly componentService: ComponentService;

    constructor() {
        this.componentService = container.resolve(ComponentService);
    }

    @Mutation(() => Project)
    async duplicateComponent(@Arg('input') input: DuplicateComponentInput, @Ctx() context: Context): Promise<Project> {
        return this.componentService.duplicateComponent(input, context);
    }

    @Mutation(() => Project)
    async removeComponent(@Arg('input') input: DuplicateComponentInput, @Ctx() context: Context): Promise<Project> {
        return this.componentService.removeComponent(input, context);
    }

    @Mutation(() => Project)
    async addComponent(@Arg('input') input: CreateComponentInput, @Ctx() context: Context): Promise<Project> {
        return this.componentService.createComponent(input, context);
    }

    @Mutation(() => Project)
    async updateComponent(@Arg('input') input: UpdateComponentInput, @Ctx() context: Context): Promise<Project> {
        return this.componentService.updateComponent(input, context);
    }
}