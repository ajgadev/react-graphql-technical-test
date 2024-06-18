import { Field, InputType } from 'type-graphql';
import { IsString, ValidateNested } from 'class-validator';
import { ModifyableComponentInput } from './ModifyableComponentInput';
import { Type } from 'class-transformer';

@InputType()
export class UpdateComponentInput {
  @Field()
  @IsString()
  projectId!: string;

  @Field()
  @IsString()
  packagingId!: string;

  @Field()
  @IsString()
  componentId!: string;
  
  @Field(() => ModifyableComponentInput)
  @ValidateNested()
  @Type(() => ModifyableComponentInput)
  componentInfo!: ModifyableComponentInput;
}