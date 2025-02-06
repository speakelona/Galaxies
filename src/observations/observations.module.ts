import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ObservationsService } from './observations.service';
import { ObservationsResolver } from './observations.resolver';
import { Observation, ObservationSchema } from './schemas/observation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Observation.name, schema: ObservationSchema },
    ]),
  ],
  providers: [ObservationsService, ObservationsResolver],
  exports: [ObservationsService],
})
export class ObservationsModule {} 