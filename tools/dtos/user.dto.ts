import { GroupModel } from "tools/models/group.model";
import { RoleModel } from "tools/models/role.model";

export class UserCreateDto {
    @IsNotEmpty()
    @Length(2, 20)
    @ApiProperty()
    name: string;
    @ApiProperty()
    surname: string;
    @ApiProperty()
    image: string;
    @ApiProperty()
    password: string;
    @ApiProperty()
    @IsEmail()
    email: string;
    @ApiProperty()
    @IsDateString()
    birthDay: Date;
  }
  
  // tslint:disable-next-line:max-classes-per-file
  export class UserUpdateDto {
    name: string;
    surname: string;
    image: string;
    password: string;
    email: string;
    birthDay: Date;
    roles: RoleModel[];
    groups: GroupModel[];
  }
  
  // tslint:disable-next-line:max-classes-per-file
  export class UserLoginDto {

    email: string;

    password: string;
  }