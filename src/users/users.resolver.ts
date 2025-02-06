import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './dto/user.type';
import { CreateUserInput } from './dto/create-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(() => User)
  async user(@Args('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput): Promise<User> {
    return this.usersService.create(createUserInput);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id') id: string,
    @Args('updateData') updateData: CreateUserInput,
  ): Promise<User> {
    return this.usersService.update(id, updateData);
  }

  @Mutation(() => User)
  async removeUser(@Args('id') id: string): Promise<User> {
    return this.usersService.remove(id);
  }

  @Query(() => User)
  async userByEmail(@Args('email') email: string): Promise<User> {
    return this.usersService.findByEmail(email);
  }
} 