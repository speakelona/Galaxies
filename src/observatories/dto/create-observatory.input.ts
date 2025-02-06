import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNumber, IsOptional, IsBoolean, ValidateNested } from 'class-validator';
import { GraphQLJSON } from 'graphql-type-json';
import { Type } from 'class-transformer';

@InputType()
export class LocationInput {
  @Field()
  @IsNumber()
  latitude: number;

  @Field()
  @IsNumber()
  longitude: number;

  @Field()
  @IsNumber()
  altitude: number;

  @Field()
  @IsString()
  address: string;

  @Field()
  @IsString()
  securityDetails: string;
}

@InputType()
export class CreateObservatoryInput {
  @Field()
  @IsString()
  name: string;

  @Field(() => LocationInput)
  @ValidateNested()
  @Type(() => LocationInput)
  location: LocationInput;

  @Field()
  @IsString()
  website: string;

  @Field()
  @IsString()
  description: string;

  @Field()
  @IsString()
  securityCode: string;

  @Field()
  @IsString()
  apiKey: string;

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @Field(() => GraphQLJSON, { nullable: true })
  @IsOptional()
  settings?: any;
} 