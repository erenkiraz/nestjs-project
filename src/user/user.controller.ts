import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserCreateDto } from 'tools/dtos/user.dto';
import { UserModel } from 'tools/models/user.model';
import { UserModule } from './user.module';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
constructor( private userService:UserService){}

@Post()
createUser(@Body() body: UserCreateDto){
    return this.userService.createUser(body);
}
@Get()
getAllUser(): UserModule[] {
    return this.userService.getAllUsers();
}

@Get(':id')
getUSer(@Param() param): UserModel{
    return this.userService.getUSerById(param.id);
}


}
