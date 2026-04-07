import { Module } from '@nestjs/common';
import { RotinaController } from './rotina.controller';
import { RotinaService } from './rotina.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RotinaEntity } from './entities/rotina.entity';
import { UserEntity } from 'src/user/entities/user.entity';


@Module({
    imports: [TypeOrmModule.forFeature([RotinaEntity, UserEntity])],
    controllers: [RotinaController],
    providers: [RotinaService],
})
export class RotinaModule {}
