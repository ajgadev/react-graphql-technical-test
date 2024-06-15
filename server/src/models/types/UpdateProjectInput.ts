import { InputType, Field, ID, Float } from "type-graphql";
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

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  layerWeight?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  layerMaterial?: string;
}
