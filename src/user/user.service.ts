import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ){}


    async findUserByName(name: string){
        const user = await this.userRepository.findOneBy({ name: name })

        if(!user){
            throw new NotFoundException('Não foi possível encontrar o Usuario!')
        }

        return user
    }

    async create(data: CreateUserDto) {
        const user = this.userRepository.create(data)
        await this.userRepository.save(user)
        return { id: user.id , name: user.name, email: user.email }
    }

    async update(id: number, data: UpdateUserDto) {
        await this.findOne(id)
        return await this.userRepository.update(id, data)
    }

    async findOne(id: number){
        const user = await this.userRepository.findOneBy({
            id: id
        })
        if(!user){
            throw new NotFoundException('User not found')
        }
        return user
    }

    async findAll() {
        return await this.userRepository.find()
    }

    async delete(id: number) {
        await this.findOne(id)
        await this.userRepository.delete(id)
    }
}
