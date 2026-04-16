import { Module } from '@nestjs/common';
import { FinanceiroService } from './financeiro.service';
import { FinanceiroController } from './financeiro.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaFinanceiroEntity } from './entities/categoria_financeiro.entity';
import { EntradaFinanceiroEntity } from './entities/entrada_financeiro.entity';
import { FinanceiroEntity } from './entities/financeiro.entity';
import { UserEntity } from 'src/user/entities/user.entity';


@Module({
  imports: [TypeOrmModule.forFeature([CategoriaFinanceiroEntity, EntradaFinanceiroEntity, FinanceiroEntity, UserEntity])],
  providers: [FinanceiroService],
  controllers: [FinanceiroController],
})
export class FinanceiroModule {}
