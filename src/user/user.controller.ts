import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserCreateDto, UserUpdateDto } from 'tools/dtos/user.dto';
import { UserModel } from 'tools/models/user.model';
import { UserModule } from './user.module';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Post()
    async createUser(@Body() body: UserCreateDto): Promise<UserModel> {
        return await this.userService.create(body);
    }
    @Get()
    async getAllUser(): Promise<UserModule[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    async getUSer(@Param() param): Promise<UserModel> {
        return await this.userService.findOne(param.id);
    }

    @Put(':id')
    async updateUser(
        @Param('id') id: string,
        @Body() UserUpdateDto: UserUpdateDto,
        ): Promise<UserModel> {
        return await this.userService.update(id, UserUpdateDto);
    }

    @Delete(':id')
    async removeUser(@Param('id') id: string): Promise<UserModel> {
        return await this.userService.delete(id);
    }

}
