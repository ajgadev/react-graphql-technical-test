import { GraphQLError } from "graphql";
import { container } from "tsyringe";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Context } from "../models/Context";
import { Project } from "../models/Project";
import { ComponentLayer } from "../models/ComponentLayer";
import { LayerService } from "../services/LayerService";
import { DuplicateLayerInput } from "../models/types/layer/DuplicateLayerInput";
import { UpdateLayerInput } from "../models/types/layer/UpdateLayerInput";
import { CreateLayerInput } from "../models/types/layer/CreateLayerInput";
import { validate } from "class-validator";
@Resolver(ComponentLayer)
export class LayerResolver {
    readonly layerService: LayerService;

    constructor() {
        this.layerService = container.resolve(LayerService);
    }

    @Mutation(() => Project)
    async duplicateLayer(@Arg('input') input: DuplicateLayerInput, @Ctx() context: Context): Promise<Project> {
        const errors = await validate(input);
        if (errors.length > 0) {
            // Log validation errors
            const errorMessages = errors
                .map(error => Object.values(error.constraints ?? {}).join(', '))
                .join(', ');
            throw new GraphQLError(`Validation error: ${errorMessages}`);
        }
        return this.layerService.duplicateLayer(input, context);
    }

    @Mutation(() => Project)
    async removeLayer(@Arg('input') input: DuplicateLayerInput, @Ctx() context: Context): Promise<Project> {
        const errors = await validate(input);
        if (errors.length > 0) {
            // Log validation errors
            const errorMessages = errors
                .map(error => Object.values(error.constraints ?? {}).join(', '))
                .join(', ');
            throw new GraphQLError(`Validation error: ${errorMessages}`);
        }
        return this.layerService.removeLayer(input, context);
    }

    @Mutation(() => Project)
    async updateLayer(@Arg('input') input: UpdateLayerInput, @Ctx() context: Context): Promise<Project> {
        const errors = await validate(input);
        if (errors.length > 0) {
            // Log validation errors
            const errorMessages = errors
                .map(error => Object.values(error.constraints ?? {}).join(', '))
                .join(', ');
            throw new GraphQLError(`Validation error: ${errorMessages}`);
        }
        return this.layerService.updateLayer(input, context);
    }

    @Mutation(() => Project)
    async addLayer(@Arg('input') input: CreateLayerInput, @Ctx() context: Context): Promise<Project> {
        const errors = await validate(input);
        if (errors.length > 0) {
            // Log validation errors
            const errorMessages = errors
                .map(error => Object.values(error.constraints ?? {}).join(', '))
                .join(', ');
            throw new GraphQLError(`Validation error: ${errorMessages}`);
        }
        return this.layerService.createLayer(input, context);
    }

}