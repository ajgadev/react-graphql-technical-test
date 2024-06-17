import { Field, InputType, Float } from 'type-graphql';
import { IsString } from 'class-validator';
import { ModifyableComponentInput } from './ModifyableComponentInput';

@InputType()
export class CreateComponentInput {
  @Field()
  @IsString()
  projectId!: string;

  @Field()
  @IsString()
  packagingId!: string;
  
  @Field(() => ModifyableComponentInput)
  componentInfo!: ModifyableComponentInput;
}