import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { ResourceService } from 'libs/services/resource.service';
import { AuditModel } from 'tools/models/audit.model';
import { UserCreateDto, UserUpdateDto } from 'tools/dtos/user.dto';
import { UserModel } from 'tools/models/user.model';
import environment from 'tools/environment/environment';


interface UserModelDoc extends AuditModel, UserModel, Document {}

const bcrypt = require('bcrypt');
const saltRounds = 10;
const hashtext = environment.hashText;

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

  async convertToHash(value: string) {
    let hashPwd;
    await bcrypt.hash(`${hashtext}${value}`, saltRounds).then(hash => {
      hashPwd = hash;
    });
    return await hashPwd;
  }

  async compareHashes(password, hashed) {
    const match = await bcrypt.compareSync(`${hashtext}${password}`, hashed);
    return await match;
  }



}