import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observation, ObservationDocument } from './schemas/observation.schema';
import { CreateObservationInput } from './dto/create-observation.input';
import { User } from '../users/schemas/user.schema';

@Injectable()
export class ObservationsService {
  constructor(
    @InjectModel(Observation.name) private observationModel: Model<ObservationDocument>,
  ) {}

  async create(createObservationInput: CreateObservationInput, user: User): Promise<Observation> {
    const observation = new this.observationModel({
      ...createObservationInput,
      observer: user,
      telescope: createObservationInput.telescopeId,
    });

    return observation.save();
  }

  async findAll(): Promise<Observation[]> {
    return this.observationModel
      .find()
      .populate('observer')
      .populate('telescope')
      .exec();
  }

  async findOne(id: string): Promise<Observation> {
    return this.observationModel
      .findById(id)
      .populate('observer')
      .populate('telescope')
      .exec();
  }

  async update(id: string, updateData: Partial<Observation>, user: User): Promise<Observation> {
    return this.observationModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }

  async remove(id: string, user: User): Promise<Observation> {
    return this.observationModel.findByIdAndDelete(id).exec();
  }

  async findByObserver(observerId: string): Promise<Observation[]> {
    return this.observationModel
      .find({ observer: observerId })
      .populate('observer')
      .populate('telescope')
      .exec();
  }

  async findByTelescope(telescopeId: string): Promise<Observation[]> {
    return this.observationModel
      .find({ telescope: telescopeId })
      .populate('observer')
      .populate('telescope')
      .exec();
  }

  async addCollaborator(id: string, userId: string): Promise<Observation> {
    return this.observationModel
      .findByIdAndUpdate(
        id,
        { $push: { collaborators: userId } },
        { new: true }
      )
      .exec();
  }

  async updateResearchData(id: string, data: any): Promise<Observation> {
    return this.observationModel
      .findByIdAndUpdate(
        id,
        { researchData: data },
        { new: true }
      )
      .exec();
  }
} 