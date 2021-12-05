import { AuditModel } from "./audit.model";
import { GroupModel } from "./group.model";
import * as mongoose from 'mongoose'
import { RoleModel } from "./role.model";
export class UserModel {
  // id: string;
  name: string;
  surname: string;
  imageUrl: string;
  email: string;
  password: string;
  securityCode: number;
  // birthDay: Date;
  audit: object;
  roles: RoleModel[];
}
  export const UserSchema = new mongoose.Schema(
    {
    name:{ type: String, required: [true, 'user name is required']},
    surname:String,
    email:String,
    password:String,
    birthDay:Date,
    audit: Object,
    roles: Array,
    groups: Array
  });