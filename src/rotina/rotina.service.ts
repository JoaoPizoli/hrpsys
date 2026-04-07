import { Injectable, NotFoundException } from '@nestjs/common';
import { RotinaEntity } from './entities/rotina.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRotinaDto } from './dto/create-rotina.dto';
import { UpdateRotinaDto } from './dto/update-rotina.dto';
import { StatusEnum } from './enum/status.enum';

@Injectable()
export class RotinaService {
    constructor(
        @InjectRepository(RotinaEntity)
        private readonly rotinaRepository: Repository<RotinaEntity>
    ){}

    async create(data: CreateRotinaDto){
        const rotina = this.rotinaRepository.create(data)
        return await this.rotinaRepository.save(rotina)
    }

    async update(id: number, data: UpdateRotinaDto){
        await this.findOne(id)
        return await this.rotinaRepository.update(id, data)
    }

    async delete(id: number){
        await this.findOne(id)
        await this.rotinaRepository.delete(id)
    }

    async findOne(id: number){
        const rotina = await this.rotinaRepository.findOneBy({ id: id })
        if(!rotina){
            throw new NotFoundException('Rotina not found')
        }
        return rotina
    }  

    async findAll(){
        return await this.rotinaRepository.find()
    }

    async changeStatus(id: number){
        const rotina = await this.findOne(id)
        const novoStatus = rotina.status === StatusEnum.PENDENTE
        ? StatusEnum.CONCLUIDO
        : StatusEnum.PENDENTE
        return await this.rotinaRepository.update(id, { status: novoStatus })
    }
}
