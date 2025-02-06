import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNumber, IsOptional, IsDate, IsArray, ValidateNested } from 'class-validator';
import { GraphQLJSON } from 'graphql-type-json';
import { Type } from 'class-transformer';

@InputType()
export class CelestialCoordinatesInput {
  @Field()
  @IsString()
  rightAscension: string;

  @Field()
  @IsString()
  declination: string;

  @Field()
  @IsString()
  epoch: string;
}

@InputType()
export class WeatherConditionsInput {
  @Field()
  @IsNumber()
  temperature: number;

  @Field()
  @IsNumber()
  humidity: number;

  @Field()
  @IsNumber()
  visibility: number;

  @Field()
  @IsString()
  notes: string;
}

@InputType()
export class ResearchDataInput {
  @Field()
  @IsString()
  classification: string;

  @Field()
  @IsNumber()
  magnitude: number;

  @Field()
  @IsString()
  spectralType: string;

  @Field()
  @IsString()
  rawData: string;

  @Field()
  @IsString()
  confidentialNotes: string;
}

@InputType()
export class CreateObservationInput {
  @Field()
  @IsString()
  telescopeId: string;

  @Field(() => Date)
  @IsDate()
  @Type(() => Date)
  startTime: Date;

  @Field(() => Date)
  @IsDate()
  @Type(() => Date)
  endTime: Date;

  @Field()
  @IsString()
  target: string;

  @Field(() => CelestialCoordinatesInput)
  @ValidateNested()
  @Type(() => CelestialCoordinatesInput)
  coordinates: CelestialCoordinatesInput;

  @Field(() => WeatherConditionsInput)
  @ValidateNested()
  @Type(() => WeatherConditionsInput)
  weatherConditions: WeatherConditionsInput;

  @Field(() => ResearchDataInput)
  @ValidateNested()
  @Type(() => ResearchDataInput)
  researchData: ResearchDataInput;

  @Field(() => [String])
  @IsArray()
  @IsString({ each: true })
  imageUrls: string[];

  @Field()
  @IsString()
  privateNotes: string;

  @Field(() => [String])
  @IsArray()
  @IsString({ each: true })
  collaborators: string[];

  @Field()
  @IsString()
  accessLevel: string;

  @Field()
  @IsString()
  dataHash: string;

  @Field(() => GraphQLJSON, { nullable: true })
  @IsOptional()
  metadata?: any;

  @Field()
  @IsString()
  status: string;
} 