import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ObservatoriesService } from './observatories.service';
import { ObservatoriesResolver } from './observatories.resolver';
import { Observatory, ObservatorySchema } from './schemas/observatory.schema';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Observatory.name, schema: ObservatorySchema },
    ]),
    UsersModule,
  ],
  providers: [ObservatoriesService, ObservatoriesResolver],
  exports: [ObservatoriesService],
})
export class ObservatoriesModule {} 