import { GraphQLError } from "graphql";
import { container } from "tsyringe";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { Context } from "../models/Context";
import { Project } from "../models/Project";
import { PackagingService } from "../services/PackagingService";
import { validate } from "class-validator";
import { DuplicatePackagingInput } from "../models/types/packaging/DuplicatePackagingInput";
import { Packaging } from "../models/Packaging";
import { UpdatePackagingInput } from "../models/types/packaging/UpdatePackagingInput";
import { CreatePackagingInput } from "../models/types/packaging/CreatePackagingInput";

@Resolver(Packaging)
export class PackagingResolver {
    readonly packagingService: PackagingService;

    constructor() {
        this.packagingService = container.resolve(PackagingService);
    }
    @Mutation(() => Project)
    async duplicatePackaging(@Arg('input') input: DuplicatePackagingInput, @Ctx() context: Context): Promise<Project> {
        const errors = await validate(input);
        if (errors.length > 0) {
        // Log validation errors
        const errorMessages = errors
            .map(error => Object.values(error.constraints ?? {}).join(', '))
            .join(', ');
        throw new GraphQLError(`Validation error: ${errorMessages}`);
        }
        return this.packagingService.duplicatePackaging(input, context);
    }

    @Mutation(() => Project)
    async updatePackaging(@Arg('input') input: UpdatePackagingInput, @Ctx() context: Context): Promise<Project> {
        const errors = await validate(input);
        if (errors.length > 0) {
        // Log validation errors
        const errorMessages = errors
            .map(error => Object.values(error.constraints ?? {}).join(', '))
            .join(', ');
        throw new GraphQLError(`Validation error: ${errorMessages}`);
        }
        return this.packagingService.updatePackaging(input, context);
    }

    @Mutation(() => Project)
    async removePackaging(@Arg('input') input: DuplicatePackagingInput, @Ctx() context: Context): Promise<Project> {
        const errors = await validate(input);
        if (errors.length > 0) {
        // Log validation errors
        const errorMessages = errors
            .map(error => Object.values(error.constraints ?? {}).join(', '))
            .join(', ');
        throw new GraphQLError(`Validation error: ${errorMessages}`);
        }
        return this.packagingService.removePackaging(input, context);
    }

    @Mutation(() => Project)
    async createPackaging(@Arg('input') input: CreatePackagingInput, @Ctx() context: Context): Promise<Project> {
        const errors = await validate(input);
        if (errors.length > 0) {
        // Log validation errors
        const errorMessages = errors
            .map(error => Object.values(error.constraints ?? {}).join(', '))
            .join(', ');
        throw new GraphQLError(`Validation error: ${errorMessages}`);
        }
        return this.packagingService.createPackaging(input, context);
    }
}