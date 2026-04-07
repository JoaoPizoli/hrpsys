import { Module } from '@nestjs/common';
import { CompromissoService } from './compromisso.service';
import { CompromissoController } from './compromisso.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompromissoEntity } from './entities/compromisso.entity';
import { UserEntity } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CompromissoEntity, UserEntity])],
  providers: [CompromissoService],
  controllers: [CompromissoController],
})
export class CompromissoModule {}
