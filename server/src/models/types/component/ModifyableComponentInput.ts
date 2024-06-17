import { Field, InputType, Float } from 'type-graphql';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

@InputType()
export class ModifyableComponentInput {
    @Field({nullable: true})
    @IsString()
    @IsOptional()
    name?: string;
    
    @Field({nullable: true})
    @IsString()
    @IsOptional()
    componentType?: string;

    @Field({nullable: true})
    @IsString()
    colour?: string;

    @Field({nullable: true})
    @IsString()
    colourant?: string;

    @Field({nullable: true})
    @IsString()
    opacity?: string;

    @Field(() => Float, {nullable: true})
    @IsNumber()
    @IsOptional()
    @Min(0)
    @Max(100)
    coverage?: number;
}