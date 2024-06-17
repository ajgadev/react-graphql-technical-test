import { Field, InputType, Float } from 'type-graphql';
import { IsString } from 'class-validator';
import { ModifyableComponentInput } from './ModifyableComponentInput';

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
  componentInfo!: ModifyableComponentInput;
}