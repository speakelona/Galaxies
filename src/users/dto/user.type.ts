import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class PersonalData {
  @Field()
  cpf: string;

  @Field()
  phone: string;

  @Field()
  address: string;
}

@ObjectType()
export class User {
  @Field(() => ID)
  _id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  role: string;

  @Field()
  isActive: boolean;

  @Field(() => PersonalData, { nullable: true })
  personalData?: PersonalData;

  @Field({ nullable: true })
  apiKey?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
} 