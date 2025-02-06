import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsEmail, IsOptional } from 'class-validator';

@InputType()
export class PersonalDataInput {
  @Field()
  @IsString()
  cpf: string;

  @Field()
  @IsString()
  phone: string;

  @Field()
  @IsString()
  address: string;
}

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  password: string;

  @Field(() => PersonalDataInput, { nullable: true })
  @IsOptional()
  personalData?: PersonalDataInput;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  apiKey?: string;
} 