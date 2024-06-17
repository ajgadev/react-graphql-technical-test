import { GraphQLError } from "graphql";
import { container } from "tsyringe";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Context } from "../models/Context";
import { Project } from "../models/Project";
import { ComponentLayer } from "../models/ComponentLayer";
import { LayerService } from "../services/LayerService";
import { DuplicateLayerInput } from "../models/types/DuplicateLayerInput";

@Resolver(ComponentLayer)
export class LayerResolver {
    readonly layerService: LayerService;

    constructor() {
        this.layerService = container.resolve(LayerService);
    }

    @Mutation(() => Project)
    async duplicateLayer(@Arg('input') input: DuplicateLayerInput, @Ctx() context: Context): Promise<Project> {
        return this.layerService.duplicateLayer(input, context);
    }

    @Mutation(() => Project)
    async removeLayer(@Arg('input') input: DuplicateLayerInput, @Ctx() context: Context): Promise<Project> {
        return this.layerService.removeLayer(input, context);
    }
}