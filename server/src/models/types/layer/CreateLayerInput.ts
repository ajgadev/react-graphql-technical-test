import { Field, InputType } from 'type-graphql';
import { IsString, ValidateNested } from 'class-validator';
import { ModifyableLayerInput } from './ModifyableLayerInput';
import { Type } from 'class-transformer';

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
  @ValidateNested()
  @Type(() => ModifyableLayerInput)
  layerInfo!: ModifyableLayerInput;
}