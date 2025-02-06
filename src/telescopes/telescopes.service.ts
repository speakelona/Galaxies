import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Telescope, TelescopeDocument } from './schemas/telescope.schema';
import { CreateTelescopeInput } from './dto/create-telescope.input';
import { User } from '../users/schemas/user.schema';

@Injectable()
export class TelescopesService {
  constructor(
    @InjectModel(Telescope.name) private telescopeModel: Model<TelescopeDocument>,
  ) {}

  async create(createTelescopeInput: CreateTelescopeInput): Promise<Telescope> {
    const telescope = new this.telescopeModel({
      ...createTelescopeInput,
      observatory: createTelescopeInput.observatoryId,
    });

    return telescope.save();
  }

  async findAll(): Promise<Telescope[]> {
    return this.telescopeModel
      .find()
      .populate('observatory')
      .exec();
  }

  async findOne(id: string): Promise<Telescope> {
    return this.telescopeModel
      .findById(id)
      .populate('observatory')
      .exec();
  }

  async update(id: string, updateData: Partial<Telescope>, user: User): Promise<Telescope> {
    return this.telescopeModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }

  async remove(id: string, user: User): Promise<Telescope> {
    return this.telescopeModel.findByIdAndDelete(id).exec();
  }

  async findByObservatory(observatoryId: string): Promise<Telescope[]> {
    return this.telescopeModel
      .find({ observatory: observatoryId })
      .populate('observatory')
      .exec();
  }

  async addMaintenanceLog(id: string, log: any): Promise<Telescope> {
    return this.telescopeModel
      .findByIdAndUpdate(
        id,
        { $push: { maintenanceLogs: log } },
        { new: true }
      )
      .exec();
  }

  async updateNetworkConfig(id: string, config: any): Promise<Telescope> {
    return this.telescopeModel
      .findByIdAndUpdate(
        id,
        { networkConfig: config },
        { new: true }
      )
      .exec();
  }
} 