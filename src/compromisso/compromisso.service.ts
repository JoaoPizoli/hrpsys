import { Injectable, NotFoundException } from '@nestjs/common';
import { CompromissoEntity } from './entities/compromisso.entity';
import { CreateCompromissoDto } from './dto/create-compromisso.dto';
import { UpdateCompromissoDto } from './dto/update-compromisso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CompromissoService {
    constructor(
        @InjectRepository(CompromissoEntity)
        private readonly compromissoRepository: Repository<CompromissoEntity>
    ){}

    async create(data: CreateCompromissoDto){
        const recado = this.compromissoRepository.create(data)
        return await this.compromissoRepository.save(recado)
    }

    async update(id: number, data: UpdateCompromissoDto){
        return await this.compromissoRepository.update(id, data)
    }

    async delete(id: number){
        await this.compromissoRepository.delete(id)
    }

    async findOne(id: number){
        const compromisso = await this.compromissoRepository.findOneBy({ id: id })
        if(!compromisso){
            throw new NotFoundException('Compromisso not found')
        }
        return compromisso
    }

    async findAll(){
        return await this.compromissoRepository.find()
    }
}
