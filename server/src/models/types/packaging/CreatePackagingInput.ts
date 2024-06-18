import { Field, InputType } from 'type-graphql';
import { IsString, IsNotEmpty } from 'class-validator';
import { ModifyablePackagingInput } from './ModifyablePackagingInput';

@InputType()
export class CreatePackagingInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  projectId!: string;

  @Field(() => ModifyablePackagingInput)
  packagingInfo!: ModifyablePackagingInput;
}