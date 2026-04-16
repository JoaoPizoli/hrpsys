import { Injectable, NotFoundException } from '@nestjs/common';
import { EntradaFinanceiroEntity } from './entities/entrada_financeiro.entity';
import { CategoriaFinanceiroEntity } from './entities/categoria_financeiro.entity';
import { FinanceiroEntity } from './entities/financeiro.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEntradaFinanceiraDto } from './dto/create-entrada_financeira.dto';
import { UpdateEntradaFinanceiraDto } from './dto/update-entrada-financeira.dto';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { TipoCategoriaEnum } from './enum/tipo-categoria.enum';
import { findMonth } from './utils/entrada_financeiro.utils';


@Injectable()
export class FinanceiroService {
    constructor(
        @InjectRepository(EntradaFinanceiroEntity)
        private readonly entradasFinanceiraRepository: Repository<EntradaFinanceiroEntity>,

        @InjectRepository(CategoriaFinanceiroEntity)
        private readonly categoriaRepository: Repository<CategoriaFinanceiroEntity>,

        @InjectRepository(FinanceiroEntity)
        private readonly financeiroRepository: Repository<FinanceiroEntity>
    ){}

    // Categoria Services

    async createCategoria(data: CreateCategoriaDto){
        const categoria = this.categoriaRepository.create(data)
        return await this.categoriaRepository.save(categoria)
    }

    async updateCategoria(id: number, data: UpdateCategoriaDto){
        await this.findOneCategoria(id)
        return await this.categoriaRepository.update(id, data)
    }

    async deleteCategoria(id: number){
        await this.findOneCategoria(id)
        return await this.categoriaRepository.delete(id)
    }

    async findOneCategoria(id: number){
        const categoria = await this.categoriaRepository.findOneBy({ id: id })
        
        if(!categoria){
            throw new NotFoundException('Categoria not found!');
        }

        return categoria
    }

    async findAllCategoria(){
        return await this.categoriaRepository.find()
    }


    // EntradasFinanceira Service

    async createEntradaFinanceira(data: CreateEntradaFinanceiraDto){
        await this.findOneCategoria(data.categoria_id)
        const entradaFinanceira = this.entradasFinanceiraRepository.create(data)
        return await this.entradasFinanceiraRepository.save(entradaFinanceira)
    }

    async updateEntradaFinanceira(id: number, data: UpdateEntradaFinanceiraDto){
        await this.findOneEntradaFinanceira(id)
        return await this.entradasFinanceiraRepository.update(id, data)
    }

    async deleteEntradaFinanceira(id: number){
        await this.findOneEntradaFinanceira(id)
        await this.entradasFinanceiraRepository.delete(id)
    }

    async findOneEntradaFinanceira(id: number){
        const entrada = await this.entradasFinanceiraRepository.findOneBy({ id: id })

        if(!entrada){
            throw new NotFoundException('Entrada Financeira not found!')
        }

        return entrada
    }

    async findAllEntradaFinanceira(){
        return await this.entradasFinanceiraRepository.find()
    }

    

    // Relação entre Categoria e EntradasFinanceira

    async findEntradasByCategoria(categoria_id: number){
        const entradas = await this.categoriaRepository.find({
            relations: {
                entradas_financeiro: true,
            }, 
            where: {
                id: categoria_id
            }
        })

        if(!entradas) {
            throw new NotFoundException('Entradas by Categoria not found!');
        }

    }

    async findEntradasByTipoCategoria(tipo: TipoCategoriaEnum){
        const entradas = await this.categoriaRepository.find({
            relations: {
                entradas_financeiro: true,
            },
            where: {
                tipo: tipo
            }
        })

        if(!entradas){
            throw new NotFoundException('Entradas by Tipo Categoria not found!')
        }
    }


    async 


}
