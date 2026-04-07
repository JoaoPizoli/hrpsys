import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CompromissoService } from './compromisso.service';
import { CreateCompromissoDto } from './dto/create-compromisso.dto';
import { UpdateCompromissoDto } from './dto/update-compromisso.dto';


@Controller('compromisso')
export class CompromissoController {
    constructor(
        private readonly compromissoService: CompromissoService
    ){}

    @Post()
    async create(@Body() data: CreateCompromissoDto){
        return await this.compromissoService.create(data)
    }

    @Patch(':id')
    async update(@Param('id') id: number, @Body() data: UpdateCompromissoDto){
        return await this.compromissoService.update(id, data)
    }

    @Delete(':id')
    async delete(@Param('id') id: number){
        await this.compromissoService.delete(id)
    }

    @Get(':id')
    async findOne(@Param('id') id: number){
        return await this.compromissoService.findOne(id)
    }

    @Get()
    async findAll(){
        return await this.compromissoService.findAll()
    }

}
