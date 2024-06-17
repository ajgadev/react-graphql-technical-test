import { Field, InputType, Float } from 'type-graphql';
import { IsBoolean, IsNumber, IsOptional, IsString, Min } from 'class-validator';

@InputType()
export class ModifyableLayerInput {
  @Field({nullable: true})
  @IsString()
  @IsOptional()
  name?: string;
  
  @Field({nullable: true})
  @IsString()
  @IsOptional()
  layerType?: string;

  @Field({nullable: true})
  @IsString()
  @IsOptional()
  materialKey?: string;

  @Field({nullable: true})
  @IsBoolean()
  @IsOptional()
  visibleOuterLayer?: boolean;

  @Field(() => Float, {nullable: true})
  @IsNumber()
  @IsOptional()
  @Min(0)
  density?: number;

  @Field(() => Float, {nullable: true})
  @IsNumber()
  @IsOptional()
  @Min(0)
  weight?: number;
}