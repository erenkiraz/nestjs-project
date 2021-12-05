import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { ResourceService } from 'libs/services/resource.service';
import { AuditModel } from 'tools/models/audit.model';
import { UserCreateDto, UserUpdateDto } from 'tools/dtos/user.dto';
import { UserModel } from 'tools/models/user.model';

interface UserModelDoc extends AuditModel, UserModel, Document {}

@Injectable()
export class UserService extends ResourceService<
  UserModelDoc,
  UserCreateDto | UserUpdateDto
> {
  constructor(
    @InjectModel('User')
    userMongo: Model<UserModelDoc>,
  ) {
    super(userMongo);
  }
}