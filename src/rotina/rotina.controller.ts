import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { RotinaService } from './rotina.service';
import { CreateRotinaDto } from './dto/create-rotina.dto';
import { UpdateRotinaDto } from './dto/update-rotina.dto';

@Controller('rotina')
export class RotinaController {
    constructor(
        private readonly rotinaService: RotinaService 
    ){}

    @Post()
    async create(@Body() data: CreateRotinaDto){
        return await this.rotinaService.create(data)
    }

    @Patch(':id')
    async update(@Param('id') id: number, @Body() data: UpdateRotinaDto){
        return await this.rotinaService.update(id, data)
    }

    @Delete(':id')
    async delete(@Param('id') id: number){
        await this.rotinaService.delete(id)
    }

    @Get(':id')
    async findOne(@Param('id') id: number){
        return await this.rotinaService.findOne(id)
    }

    @Get()
    async findAll(){
        return await this.rotinaService.findAll()
    }

    @Post(':id')
    async changeStatus(@Param('id') id: number){
        return await this.rotinaService.changeStatus(id)
    }
}
