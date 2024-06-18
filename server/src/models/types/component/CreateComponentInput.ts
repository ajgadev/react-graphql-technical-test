import { Field, InputType } from 'type-graphql';
import { IsString, ValidateNested } from 'class-validator';
import { ModifyableComponentInput } from './ModifyableComponentInput';
import { Type } from 'class-transformer';

@InputType()
export class CreateComponentInput {
  @Field()
  @IsString()
  projectId!: string;

  @Field()
  @IsString()
  packagingId!: string;
  
  @Field(() => ModifyableComponentInput)
  @ValidateNested()
  @Type(() => ModifyableComponentInput)
  componentInfo!: ModifyableComponentInput;
}