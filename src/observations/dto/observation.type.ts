import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '../../users/dto/user.type';
import { Telescope } from '../../telescopes/dto/telescope.type';
import { GraphQLJSON } from 'graphql-type-json';

@ObjectType()
export class CelestialCoordinates {
  @Field()
  rightAscension: string;

  @Field()
  declination: string;

  @Field()
  epoch: string;
}

@ObjectType()
export class WeatherConditions {
  @Field()
  temperature: number;

  @Field()
  humidity: number;

  @Field()
  visibility: number;

  @Field()
  notes: string;
}

@ObjectType()
export class ResearchData {
  @Field()
  classification: string;

  @Field()
  magnitude: number;

  @Field()
  spectralType: string;

  @Field()
  rawData: string;

  @Field()
  confidentialNotes: string;
}

@ObjectType()
export class Observation {
  @Field(() => ID)
  _id: string;

  @Field(() => User)
  observer: User;

  @Field(() => Telescope)
  telescope: Telescope;

  @Field()
  startTime: Date;

  @Field()
  endTime: Date;

  @Field()
  target: string;

  @Field(() => CelestialCoordinates)
  coordinates: CelestialCoordinates;

  @Field(() => WeatherConditions)
  weatherConditions: WeatherConditions;

  @Field(() => ResearchData)
  researchData: ResearchData;

  @Field(() => [String])
  imageUrls: string[];

  @Field()
  privateNotes: string;

  @Field(() => [String])
  collaborators: string[];

  @Field()
  accessLevel: string;

  @Field()
  dataHash: string;

  @Field(() => GraphQLJSON, { nullable: true })
  metadata?: any;

  @Field()
  status: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
} 