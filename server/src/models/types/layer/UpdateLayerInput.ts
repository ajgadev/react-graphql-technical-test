import { Field, InputType, Float } from 'type-graphql';
import { IsString } from 'class-validator';
import { ModifyableLayerInput } from '../layer/ModifyableLayerInput';

@InputType()
export class UpdateLayerInput {
  @Field()
  @IsString()
  projectId!: string;

  @Field()
  @IsString()
  packagingId!: string;

  @Field()
  @IsString()
  componentId!: string;

  @Field()
  @IsString()
  layerId!: string;
  
  @Field(() => ModifyableLayerInput)
  layerInfo!: ModifyableLayerInput;
}