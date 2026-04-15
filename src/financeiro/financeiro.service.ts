import { Injectable } from '@nestjs/common';
import { EntradasFinanceiraEntity } from './entities/entradas_financeiras.entity';
import { CategoriasEntity } from './entities/categorias.entity';
import { FinanceiroEntity } from './entities/financeiro.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FinanceiroService {
    constructor(
        @InjectRepository(EntradasFinanceiraEntity)
        private readonly entradasFinanceiraRepository: Repository<EntradasFinanceiraEntity>,

        @InjectRepository(CategoriasEntity)
        private readonly categoriaRepository: Repository<CategoriasEntity>,

        @InjectRepository(FinanceiroEntity)
        private readonly financeiroRepository: Repository<FinanceiroEntity>
    ){}

    // Categoria Services

    async createCategoria(){}

    async updateCategoria(){}

    async deleteCategoria(){}

    async findOneCategoria(){}

    async findAllCategoria(){}


    // EntradasFinanceira Service

    async createEntradaFinanceira(){}

    async updateEntradaFinanceira(){}

    async deleteEntradaFinanceira(){}

    async findOneEntradaFinanceira(){}

    async findAllEntradaFinanceira(){}

    

    // Relação entre Categoria e EntradasFinanceira

    async findEntradasByCategoria(){}

    async findEntradasByTipoCategoria(){}



}
