import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuditModel } from 'tools/models/audit.model';
import { GroupCreateDto } from 'tools/dtos/group.dto';
import { GroupModel } from 'tools/models/group.model';

@Injectable()
export class GroupService {
  constructor(
    @InjectModel('Group') private readonly groupMongo: Model<GroupModel>,
  ) {}

  async create(user: GroupCreateDto): Promise<GroupModel> {
    const audit = new AuditModel();
    audit.active = true;
    audit.createdBy = 'Admin';
    audit.createdDate = new Date();

    const createdUser = new this.groupMongo({ ...user, ...audit });

    return await createdUser.save();
  }

  async findAll(): Promise<GroupModel[]> {
    return await this.groupMongo.find().exec();
  }

  async findOne(id: string): Promise<any> {
    return await this.groupMongo.find({ _id: id }).exec();
  }

  async delete(id: string): Promise<GroupModel> {
    return await this.groupMongo.findByIdAndRemove({ _id: id }).exec();
  }
}