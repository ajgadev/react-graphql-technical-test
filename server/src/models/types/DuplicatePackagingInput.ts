import { Field, InputType } from 'type-graphql';
import { IsString } from 'class-validator';

@InputType()
export class DuplicatePackagingInput {
  @Field()
  @IsString()
  projectId!: string;

  @Field()
  @IsString()
  packagingId!: string;
}