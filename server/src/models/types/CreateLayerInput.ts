import { Field, InputType, Float } from 'type-graphql';
import { IsString } from 'class-validator';
import { ModifyableLayerInput } from './ModifyableLayerInput';

@InputType()
export class CreateLayerInput {
  @Field()
  @IsString()
  projectId!: string;

  @Field()
  @IsString()
  packagingId!: string;

  @Field()
  @IsString()
  componentId!: string;
  
  @Field(() => ModifyableLayerInput)
  layerInfo!: ModifyableLayerInput;
}