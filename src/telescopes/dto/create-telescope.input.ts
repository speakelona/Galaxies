import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNumber, IsOptional, IsBoolean, ValidateNested, IsDate } from 'class-validator';
import { GraphQLJSON } from 'graphql-type-json';
import { Type } from 'class-transformer';

@InputType()
export class SpecificationsInput {
  @Field()
  @IsNumber()
  aperture: number;

  @Field()
  @IsNumber()
  focalLength: number;

  @Field()
  @IsString()
  mountType: string;

  @Field()
  @IsString()
  controlSystem: string;

  @Field()
  @IsString()
  calibrationData: string;
}

@InputType()
export class MaintenanceLogInput {
  @Field(() => Date)
  @IsDate()
  @Type(() => Date)
  date: Date;

  @Field()
  @IsString()
  technician: string;

  @Field()
  @IsString()
  details: string;

  @Field(() => [String])
  accessCodes: string[];

  @Field()
  @IsNumber()
  cost: number;
}

@InputType()
export class NetworkConfigInput {
  @Field()
  @IsString()
  ip: string;

  @Field()
  @IsNumber()
  port: number;

  @Field()
  @IsString()
  credentials: string;
}

@InputType()
export class CreateTelescopeInput {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsString()
  model: string;

  @Field()
  @IsString()
  serialNumber: string;

  @Field()
  @IsString()
  observatoryId: string;

  @Field(() => SpecificationsInput)
  @ValidateNested()
  @Type(() => SpecificationsInput)
  specifications: SpecificationsInput;

  @Field()
  @IsString()
  controlPassword: string;

  @Field()
  @IsString()
  apiEndpoint: string;

  @Field(() => [MaintenanceLogInput], { nullable: true })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => MaintenanceLogInput)
  maintenanceLogs?: MaintenanceLogInput[];

  @Field(() => GraphQLJSON, { nullable: true })
  @IsOptional()
  settings?: any;

  @Field(() => GraphQLJSON, { nullable: true })
  @IsOptional()
  networkConfig?: any;

  @Field()
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
} 