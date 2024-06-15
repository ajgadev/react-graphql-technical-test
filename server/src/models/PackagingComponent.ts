import { Field, ObjectType, registerEnumType } from "type-graphql";
import { ComponentLayer } from "./ComponentLayer";

@ObjectType("Component")
export class PackagingComponent {
  @Field()
  id!: string;

  @Field(() => String, { nullable: true })
  colour?: String;

  @Field(() => String, { nullable: true })
  colourant?: String;

  @Field({ nullable: true })
  position?: number;

  @Field({ nullable: true })
  componentType?: string;

  @Field({ nullable: true })
  coverage?: number;

  @Field(() => [ComponentLayer], { nullable: true })
  layers?: ComponentLayer[];

  @Field({ nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  opacity?: String;

  @Field({ nullable: true })
  weight?: number;

  // @Field({ nullable: true })
  // get weight(): number {
  //   return this.layers?.reduce((total, layer) => total + (layer.weight || 0), 0) || 0;
  // }
}
