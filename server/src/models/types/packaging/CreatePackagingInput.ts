import { Field, InputType } from 'type-graphql';
import { IsString, IsNotEmpty, ValidateNested } from 'class-validator';
import { ModifyablePackagingInput } from './ModifyablePackagingInput';
import { Type } from 'class-transformer';

@InputType()
export class CreatePackagingInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  projectId!: string;

  @Field(() => ModifyablePackagingInput)
  @ValidateNested()
  @Type(() => ModifyablePackagingInput)
  packagingInfo!: ModifyablePackagingInput;
}