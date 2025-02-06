import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Observatory } from '../../observatories/dto/observatory.type';
import { GraphQLJSON } from 'graphql-type-json';

@ObjectType()
export class Specifications {
  @Field()
  aperture: number;

  @Field()
  focalLength: number;

  @Field()
  mountType: string;

  @Field()
  controlSystem: string;

  @Field()
  calibrationData: string;
}

@ObjectType()
export class MaintenanceLog {
  @Field()
  date: Date;

  @Field()
  technician: string;

  @Field()
  details: string;

  @Field(() => [String])
  accessCodes: string[];

  @Field()
  cost: number;
}

@ObjectType()
export class NetworkConfig {
  @Field()
  ip: string;

  @Field()
  port: number;

  @Field()
  credentials: string;
}

@ObjectType()
export class Telescope {
  @Field(() => ID)
  _id: string;

  @Field()
  name: string;

  @Field()
  model: string;

  @Field()
  serialNumber: string;

  @Field(() => Observatory)
  observatory: Observatory;

  @Field(() => Specifications)
  specifications: Specifications;

  @Field()
  controlPassword: string;

  @Field()
  apiEndpoint: string;

  @Field(() => [MaintenanceLog])
  maintenanceLogs: MaintenanceLog[];

  @Field(() => GraphQLJSON, { nullable: true })
  settings?: any;

  @Field(() => GraphQLJSON, { nullable: true })
  networkConfig?: any;

  @Field()
  isActive: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
} 