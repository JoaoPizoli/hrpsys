import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ){}

    @Post()
    async create(@Body() dados: CreateUserDto){
        const user = this.userService.create(dados)
        return user
    }

    @Patch(':id')
    async update(@Param('id') id: number, @Body() data: UpdateUserDto){
        const user = await this.userService.update(id, data)
        return user
    }

    @Get(':id')
    async findOne(@Param('id') id: number){
        const user = await this.userService.findOne(id)
        return user
    }

    @Get()
    async findAll(){
        return await this.userService.findAll()
    }

    @Delete(':id')
    async delete(@Param('id') id: number){
        await this.userService.delete(id)
    }
}
