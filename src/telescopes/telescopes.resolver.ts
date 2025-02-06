import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { TelescopesService } from './telescopes.service';
import { Telescope } from './dto/telescope.type';
import { CreateTelescopeInput } from './dto/create-telescope.input';
import { MaintenanceLogInput } from './dto/create-telescope.input';
import { NetworkConfigInput } from './dto/create-telescope.input';

@Resolver(() => Telescope)
export class TelescopesResolver {
  constructor(private readonly telescopesService: TelescopesService) {}

  @Query(() => [Telescope])
  async telescopes(): Promise<Telescope[]> {
    return this.telescopesService.findAll();
  }

  @Query(() => Telescope)
  async telescope(@Args('id') id: string): Promise<Telescope> {
    return this.telescopesService.findOne(id);
  }

  @Mutation(() => Telescope)
  async createTelescope(
    @Args('createTelescopeInput') createTelescopeInput: CreateTelescopeInput,
    @Context() context: any,
  ): Promise<Telescope> {
    return this.telescopesService.create(createTelescopeInput);
  }

  @Mutation(() => Telescope)
  async updateTelescope(
    @Args('id') id: string,
    @Args('updateData') updateData: CreateTelescopeInput,
    @Context() context: any,
  ): Promise<Telescope> {
    const user = context.req.user;
    return this.telescopesService.update(id, updateData, user);
  }

  @Mutation(() => Telescope)
  async removeTelescope(
    @Args('id') id: string,
    @Context() context: any,
  ): Promise<Telescope> {
    const user = context.req.user;
    return this.telescopesService.remove(id, user);
  }

  @Query(() => [Telescope])
  async telescopesByObservatory(
    @Args('observatoryId') observatoryId: string,
  ): Promise<Telescope[]> {
    return this.telescopesService.findByObservatory(observatoryId);
  }

  @Mutation(() => Telescope)
  async addMaintenanceLog(
    @Args('telescopeId') telescopeId: string,
    @Args('log') log: MaintenanceLogInput,
    @Context() context: any,
  ): Promise<Telescope> {
    return this.telescopesService.addMaintenanceLog(telescopeId, log);
  }

  @Mutation(() => Telescope)
  async updateNetworkConfig(
    @Args('telescopeId') telescopeId: string,
    @Args('config') config: NetworkConfigInput,
    @Context() context: any,
  ): Promise<Telescope> {
    return this.telescopesService.updateNetworkConfig(telescopeId, config);
  }
} 