import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '../../users/dto/user.type';
import { GraphQLJSON } from 'graphql-type-json';

@ObjectType()
export class Location {
  @Field()
  latitude: number;

  @Field()
  longitude: number;

  @Field()
  altitude: number;

  @Field()
  address: string;

  @Field()
  securityDetails: string;
}

@ObjectType()
export class Observatory {
  @Field(() => ID)
  _id: string;

  @Field()
  name: string;

  @Field(() => User)
  owner: User;

  @Field(() => [User])
  staff: User[];

  @Field(() => Location)
  location: Location;

  @Field()
  website: string;

  @Field()
  description: string;

  @Field()
  securityCode: string;

  @Field()
  apiKey: string;

  @Field()
  isActive: boolean;

  @Field(() => GraphQLJSON, { nullable: true })
  settings?: any;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
} 