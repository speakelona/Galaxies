import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { ObservationsService } from './observations.service';
import { Observation } from './dto/observation.type';
import { CreateObservationInput } from './dto/create-observation.input';
import { ResearchDataInput } from './dto/create-observation.input';

@Resolver(() => Observation)
export class ObservationsResolver {
  constructor(private readonly observationsService: ObservationsService) {}

  @Query(() => [Observation])
  async observations(): Promise<Observation[]> {
    return this.observationsService.findAll();
  }

  @Query(() => Observation)
  async observation(@Args('id') id: string): Promise<Observation> {
    return this.observationsService.findOne(id);
  }

  @Mutation(() => Observation)
  async createObservation(
    @Args('createObservationInput') createObservationInput: CreateObservationInput,
    @Context() context: any,
  ): Promise<Observation> {
    const user = context.req.user;
    return this.observationsService.create(createObservationInput, user);
  }

  @Mutation(() => Observation)
  async updateObservation(
    @Args('id') id: string,
    @Args('updateData') updateData: CreateObservationInput,
    @Context() context: any,
  ): Promise<Observation> {
    const user = context.req.user;
    return this.observationsService.update(id, updateData, user);
  }

  @Mutation(() => Observation)
  async removeObservation(
    @Args('id') id: string,
    @Context() context: any,
  ): Promise<Observation> {
    const user = context.req.user;
    return this.observationsService.remove(id, user);
  }

  @Query(() => [Observation])
  async observationsByObserver(
    @Args('observerId') observerId: string,
  ): Promise<Observation[]> {
    return this.observationsService.findByObserver(observerId);
  }

  @Query(() => [Observation])
  async observationsByTelescope(
    @Args('telescopeId') telescopeId: string,
  ): Promise<Observation[]> {
    return this.observationsService.findByTelescope(telescopeId);
  }

  @Mutation(() => Observation)
  async addCollaborator(
    @Args('observationId') observationId: string,
    @Args('userId') userId: string,
    @Context() context: any,
  ): Promise<Observation> {
    return this.observationsService.addCollaborator(observationId, userId);
  }

  @Mutation(() => Observation)
  async updateResearchData(
    @Args('observationId') observationId: string,
    @Args('data') data: ResearchDataInput,
    @Context() context: any,
  ): Promise<Observation> {
    return this.observationsService.updateResearchData(observationId, data);
  }
} 