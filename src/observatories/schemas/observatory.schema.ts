import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type ObservatoryDocument = Observatory & Document;

@Schema()
export class Location {
  @Prop({ required: true })
  latitude: number;

  @Prop({ required: true })
  longitude: number;

  @Prop({ required: true })
  altitude: number;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  securityDetails: string;
}

@Schema()
export class Observatory {
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  owner: User;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }] })
  staff: User[];

  @Prop({ type: Location, required: true })
  location: Location;

  @Prop()
  website: string;

  @Prop()
  description: string;

  @Prop()
  securityCode: string;

  @Prop()
  apiKey: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: Object })
  settings: any;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const ObservatorySchema = SchemaFactory.createForClass(Observatory); 