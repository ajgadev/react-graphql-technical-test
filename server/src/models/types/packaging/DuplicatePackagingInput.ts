import { Field, InputType } from 'type-graphql';
import { IsString, IsNotEmpty } from 'class-validator';

@InputType()
export class DuplicatePackagingInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  projectId!: string;

  @Field()
  @IsString()
  packagingId!: string;
}