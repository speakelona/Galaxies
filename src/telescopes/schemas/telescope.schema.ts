import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Observatory } from '../../observatories/schemas/observatory.schema';

export type TelescopeDocument = Telescope & Document;

@Schema()
export class Specifications {
  @Prop({ required: true })
  aperture: number;

  @Prop({ required: true })
  focalLength: number;

  @Prop({ required: true })
  mountType: string;

  @Prop({ required: true })
  controlSystem: string;

  @Prop({ required: true })
  calibrationData: string;
}

@Schema()
export class MaintenanceLog {
  @Prop()
  date: Date;

  @Prop()
  technician: string;

  @Prop()
  details: string;

  @Prop()
  accessCodes: string[];

  @Prop()
  cost: number;
}

@Schema()
export class Telescope {
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  model: string;

  @Prop({ required: true })
  serialNumber: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Observatory' })
  observatory: Observatory;

  @Prop({ type: Specifications, required: true })
  specifications: Specifications;

  @Prop()
  controlPassword: string;

  @Prop()
  apiEndpoint: string;

  @Prop([MaintenanceLog])
  maintenanceLogs: MaintenanceLog[];

  @Prop({ type: Object })
  settings: any;

  @Prop({ type: Object })
  networkConfig: any;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const TelescopeSchema = SchemaFactory.createForClass(Telescope); 