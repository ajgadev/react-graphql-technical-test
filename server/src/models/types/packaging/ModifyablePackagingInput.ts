import { Field, InputType, Float } from 'type-graphql';
import { IsBoolean, IsNumber, IsOptional, IsString, Min } from 'class-validator';

@InputType()
export class ModifyablePackagingInput {
  @Field({nullable: true})
  @IsString()
  @IsOptional()
  name?: string;
  
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  packagingType?: string;

  @Field(() => Float, { nullable: true })
  width?: number;

  @Field(() => Float, { nullable: true })
  @IsNumber()
  @IsOptional()
  @Min(0)
  length?: number;

  @Field(() => Float, { nullable: true })
  @IsNumber()
  @IsOptional()
  @Min(0)
  height?: number;

  @Field(() => Float, { nullable: true })
  @IsNumber()
  @IsOptional()
  @Min(0)
  volume?: number;
}