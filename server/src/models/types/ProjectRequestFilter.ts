import { InputType, Field } from "type-graphql";
import { IsOptional, IsString } from "class-validator";

@InputType()
export class ProjectRequestFilter {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  id?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  key?: string;
}
