import { Field, InputType } from 'type-graphql';
import { IsString, ValidateNested } from 'class-validator';
import { ModifyableLayerInput } from '../layer/ModifyableLayerInput';
import { Type } from 'class-transformer';

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
  @ValidateNested()
  @Type(() => ModifyableLayerInput)
  layerInfo!: ModifyableLayerInput;
}