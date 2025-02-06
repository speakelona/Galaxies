import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TelescopesService } from './telescopes.service';
import { TelescopesResolver } from './telescopes.resolver';
import { Telescope, TelescopeSchema } from './schemas/telescope.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Telescope.name, schema: TelescopeSchema },
    ]),
  ],
  providers: [TelescopesService, TelescopesResolver],
  exports: [TelescopesService],
})
export class TelescopesModule {} 