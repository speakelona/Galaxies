import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observatory, ObservatoryDocument } from './schemas/observatory.schema';
import { CreateObservatoryInput } from './dto/create-observatory.input';
import { User } from '../users/schemas/user.schema';
import { UsersService } from '../users/users.service';

@Injectable()
export class ObservatoriesService {
  constructor(
    @InjectModel(Observatory.name) private observatoryModel: Model<ObservatoryDocument>,
    private usersService: UsersService,
  ) {}

  async create(createObservatoryInput: CreateObservatoryInput, userPayload: any): Promise<Observatory> {
    console.log('Input recebido:', JSON.stringify(createObservatoryInput, null, 2));

    const user = await this.usersService.findOne(userPayload.sub);

    const apiKey = Math.random().toString(36).substring(7);

    if (!createObservatoryInput.location) {
      throw new BadRequestException('O campo location é obrigatório');
    }

    const observatory = new this.observatoryModel({
      ...createObservatoryInput,
      owner: user,
      apiKey,
    });

    return observatory.save();
  }

  async findAll(): Promise<Observatory[]> {
    return this.observatoryModel
      .find()
      .populate('owner')
      .populate('staff')
      .exec();
  }

  async findOne(id: string): Promise<Observatory> {
    return this.observatoryModel
      .findById(id)
      .populate('owner')
      .populate('staff')
      .exec();
  }

  async update(id: string, updateData: Partial<Observatory>, user: User): Promise<Observatory> {
    return this.observatoryModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }

  async remove(id: string, user: User): Promise<Observatory> {
    return this.observatoryModel.findByIdAndDelete(id).exec();
  }

  async findByOwner(ownerId: string): Promise<Observatory[]> {
    return this.observatoryModel
      .find({ owner: ownerId })
      .populate('owner')
      .populate('staff')
      .exec();
  }

  async addStaffMember(id: string, userId: string): Promise<Observatory> {
    return this.observatoryModel
      .findByIdAndUpdate(
        id,
        { $push: { staff: userId } },
        { new: true }
      )
      .exec();
  }
} 