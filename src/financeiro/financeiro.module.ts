import { Module } from '@nestjs/common';
import { FinanceiroService } from './financeiro.service';
import { FinanceiroController } from './financeiro.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriasEntity } from './entities/categorias.entity';
import { EntradasFinanceiraEntity } from './entities/entradas_financeiras.entity';


@Module({
  imports: [TypeOrmModule.forFeature([CategoriasEntity, EntradasFinanceiraEntity])],
  providers: [FinanceiroService],
  controllers: [FinanceiroController],
})
export class FinanceiroModule {}
