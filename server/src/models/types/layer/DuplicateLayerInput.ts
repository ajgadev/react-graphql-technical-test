import { Field, InputType } from 'type-graphql';
import { IsString } from 'class-validator';

@InputType()
export class DuplicateLayerInput {
  @Field()
  @IsString()
  projectId!: string;

  @Field()
  @IsString()
  packagingId!: string;

  @Field()
  @IsString()
  componentId!: string;

  @Field()
  @IsString()
  layerId!: string;
}