import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { Telescope } from '../../telescopes/schemas/telescope.schema';

export type ObservationDocument = Observation & Document;

@Schema()
export class CelestialCoordinates {
  @Prop()
  rightAscension: string;

  @Prop()
  declination: string;

  @Prop()
  epoch: string;
}

@Schema()
export class WeatherConditions {
  @Prop()
  temperature: number;

  @Prop()
  humidity: number;

  @Prop()
  visibility: number;

  @Prop()
  notes: string;
}

@Schema()
export class ResearchData {
  @Prop()
  classification: string;

  @Prop()
  magnitude: number;

  @Prop()
  spectralType: string;

  @Prop()
  rawData: string;

  @Prop()
  confidentialNotes: string;
}

@Schema()
export class Observation {
  _id: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  observer: User;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Telescope' })
  telescope: Telescope;

  @Prop()
  startTime: Date;

  @Prop()
  endTime: Date;

  @Prop()
  target: string;

  @Prop()
  coordinates: CelestialCoordinates;

  @Prop()
  weatherConditions: WeatherConditions;

  @Prop()
  researchData: ResearchData;

  @Prop()
  imageUrls: string[];

  @Prop()
  privateNotes: string;

  @Prop()
  collaborators: string[];

  @Prop()
  accessLevel: string;

  @Prop()
  dataHash: string;

  @Prop({ type: Object })
  metadata: any;

  @Prop()
  status: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const ObservationSchema = SchemaFactory.createForClass(Observation); 