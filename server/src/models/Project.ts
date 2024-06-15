import { Field, ObjectType } from "type-graphql";
import { Packaging } from "./Packaging";

@ObjectType()
export class Project {
  @Field()
  id!: string;

  @Field()
  key!: string;

  @Field({ nullable: true })
  name?: string;

  @Field(() => [Packaging], { nullable: true })
  packagings?: Packaging[];

  // @Field({ nullable: true })
  // weight?: number;
}
