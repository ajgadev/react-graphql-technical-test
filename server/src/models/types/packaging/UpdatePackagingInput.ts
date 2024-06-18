import { Field, InputType } from 'type-graphql';
import { IsString, IsNotEmpty, ValidateNested } from 'class-validator';
import { ModifyablePackagingInput } from './ModifyablePackagingInput';
import { Type } from 'class-transformer';

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
  @ValidateNested()
  @Type(() => ModifyablePackagingInput)
  packagingInfo!: ModifyablePackagingInput;
}