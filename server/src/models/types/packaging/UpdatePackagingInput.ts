import { Field, InputType } from 'type-graphql';
import { IsString, IsNotEmpty } from 'class-validator';
import { ModifyablePackagingInput } from './ModifyablePackagingInput';

@InputType()
export class UpdatePackagingInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  projectId!: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  packagingId!: string;

  @Field(() => ModifyablePackagingInput)
  packagingInfo!: ModifyablePackagingInput;
}