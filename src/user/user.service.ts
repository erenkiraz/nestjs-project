import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { count } from 'console';
import { Model } from 'mongoose';
import { resourceUsage } from 'process';
import { throttleTime } from 'rxjs';
import { UserCreateDto, UserUpdateDto } from 'tools/dtos/user.dto';
import { AuditModel } from 'tools/models/audit.model';
import { FilterModel } from 'tools/models/filter.model';
import { UserModel } from 'tools/models/user.model';
import { UserModule } from './user.module';

const result: UserModel[] = []

@Injectable()
export class UserService {

    constructor(@InjectModel('User') private readonly userMongo: Model<UserModel>,
    ) { }


    generalSearchQuery = {
        page: 1,
        size: 10,
        sort: 'ASC',
        sortBy: '_id',
        queryText: '',
        searchBy: 'name',
      };


    async create(user: UserCreateDto): Promise<UserModel> {

        const audit = new AuditModel();
        audit.active = true;
        audit.createdBy = 'Admin';
        audit.createdDate = new Date();

        const createdUser = new this.userMongo({ ...user, ...audit });
        return await createdUser.save();
    }


    async findAll(query?: FilterModel): Promise<any[]> {
        if (Object.keys(query).length === 0 ) {
          const count = await this.userMongo.countDocuments({}).exec();
          const data = await this.userMongo
            .find()
            .limit(Math.max(0, this.generalSearchQuery.size))
            .skip(this.generalSearchQuery.size * (this.generalSearchQuery.page - 1))
            .sort([
              [`${this.generalSearchQuery.sortBy}`, this.generalSearchQuery.sort],
            ])
            .exec();
          return await [
            {
              success: true,
              size: this.generalSearchQuery.size,
              total: count,
              data,
            },
          ];
        } else {
          if (Object.keys(query).length !== 0) {
            const searchValue = await { ...this.generalSearchQuery, ...query };
            const userRegex = new RegExp(searchValue.queryText, 'i');
    
            return await this.userMongo
              .find({
                [searchValue.searchBy]: userRegex,
              })
              .limit(Math.max(0, searchValue.size))
              .skip(searchValue.size * (searchValue.page - 1))
              .sort([[`${searchValue.sortBy}`, searchValue.sort]])
              .exec();
          } else {
            const searchValue = await { ...this.generalSearchQuery };
            const userRegex = new RegExp(searchValue.queryText, 'i');
    
            return await this.userMongo
              .find({
                [searchValue.searchBy]: userRegex,
              })
              .limit(Math.max(0, searchValue.size))
              .skip(searchValue.size * (searchValue.page - 1))
              .sort([[`${searchValue.sortBy}`, searchValue.sort]])
              .exec();
          }
        }
      }


    async findOne(id: string): Promise<any> {
        return await this.userMongo.find({ _id: id }).exec();
    }

    async delete(id: string): Promise<UserModel> {
        return await this.userMongo.findByIdAndRemove({ _id: id }).exec();
    }

    async update(id: string, user: UserUpdateDto): Promise<UserModel> {
        let newModel = this.userMongo.findOne({ _id: id }).exec();
        newModel = { ...newModel, ...user };

        return await this.userMongo
            .findByIdAndUpdate(id, newModel, { new: true })
            .exec();

    }





}
