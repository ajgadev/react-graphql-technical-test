import { Field, ObjectType, registerEnumType } from "type-graphql";

@ObjectType("Layer")
export class ComponentLayer {
  @Field()
  id!: string;

  @Field({ nullable: true })
  density?: number;

  @Field({ nullable: true })
  position?: number;

  @Field(() => String, { nullable: true })
  layerType?: String;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  materialKey?: string;

  @Field({ nullable: true })
  visibleOuterLayer?: boolean;

  @Field({ nullable: true })
  weight?: number;

  @Field({ nullable: true })
  weightFraction?: number
}
