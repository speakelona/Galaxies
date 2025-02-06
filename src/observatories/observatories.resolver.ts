import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { ObservatoriesService } from './observatories.service';
import { Observatory } from './dto/observatory.type';
import { CreateObservatoryInput } from './dto/create-observatory.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Resolver(() => Observatory)
export class ObservatoriesResolver {
  constructor(private readonly observatoriesService: ObservatoriesService) {}

  @Query(() => [Observatory])
  async observatories(): Promise<Observatory[]> {
    return this.observatoriesService.findAll();
  }

  @Query(() => Observatory)
  async observatory(@Args('id') id: string): Promise<Observatory> {
    return this.observatoriesService.findOne(id);
  }

  @Mutation(() => Observatory)
  @UseGuards(JwtAuthGuard)
  async createObservatory(
    @Args('createObservatoryInput') createObservatoryInput: CreateObservatoryInput,
    @Context() context: any,
  ): Promise<Observatory> {
    const user = context.req.user;
    return this.observatoriesService.create(createObservatoryInput, user);
  }

  @Mutation(() => Observatory)
  async updateObservatory(
    @Args('id') id: string,
    @Args('updateData') updateData: CreateObservatoryInput,
    @Context() context: any,
  ): Promise<Observatory> {
    const user = context.req.user;
    return this.observatoriesService.update(id, updateData, user);
  }

  @Mutation(() => Observatory)
  async removeObservatory(
    @Args('id') id: string,
    @Context() context: any,
  ): Promise<Observatory> {
    const user = context.req.user;
    return this.observatoriesService.remove(id, user);
  }

  @Query(() => [Observatory])
  async observatoriesByOwner(@Args('ownerId') ownerId: string): Promise<Observatory[]> {
    return this.observatoriesService.findByOwner(ownerId);
  }

  @Mutation(() => Observatory)
  async addStaffMember(
    @Args('observatoryId') observatoryId: string,
    @Args('userId') userId: string,
  ): Promise<Observatory> {
    return this.observatoriesService.addStaffMember(observatoryId, userId);
  }
} 