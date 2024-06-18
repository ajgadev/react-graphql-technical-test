import { InputType, Field, ID } from "type-graphql";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

@InputType()
export class UpdateProjectInput {
  @Field(() => ID)
  @IsNotEmpty()
  projectId: string = '';

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string;
}
