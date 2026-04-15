import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { CompromissoEntity } from 'src/compromisso/entities/compromisso.entity';
import { RotinaEntity } from 'src/rotina/entities/rotina.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, CompromissoEntity, RotinaEntity])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
