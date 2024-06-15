import { Field, Float, ObjectType } from "type-graphql";
import { PackagingComponent } from "./PackagingComponent";

@ObjectType()
export class Packaging {
  @Field()
  id!: string;

  @Field(() => [PackagingComponent], { nullable: true })
  components?: PackagingComponent[];

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  position?: number;

  @Field({ nullable: true })
  packagingType?: string;

  @Field(() => Float, { nullable: true })
  width?: number;

  @Field(() => Float, { nullable: true })
  length?: number;

  @Field(() => Float, { nullable: true })
  height?: number;

  @Field(() => Float, { nullable: true })
  volume?: number;

  @Field({ nullable: true })
  weight?: number;
  
  // @Field({ nullable: true })
  // get weight(): number {
  //   return this.components?.reduce((total, component) => total + (component.weight || 0), 0) || 0;
  // }
}
