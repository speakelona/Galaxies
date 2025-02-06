import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/dto/user.type';

@ObjectType()
export class LoginResponse {
  @Field()
  access_token: string;

  @Field(() => User)
  user: Partial<User>;
} 