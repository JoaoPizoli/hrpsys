import { Injectable, NotFoundException } from '@nestjs/common';
import { EntradaFinanceiroEntity } from './entities/entrada_financeiro.entity';
import { CategoriaFinanceiroEntity } from './entities/categoria_financeiro.entity';
import { FinanceiroEntity } from './entities/financeiro.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEntradaFinanceiraDto } from './dto/entrada-financeiro/create-entrada_financeira.dto';
import { UpdateEntradaFinanceiraDto } from './dto/entrada-financeiro/update-entrada-financeira.dto';
import { CreateCategoriaDto } from './dto/categoria-financeiro/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/categoria-financeiro/update-categoria.dto';
import { TipoCategoriaEnum } from './enum/tipo-categoria.enum';
import { CreateFinanceiroDto } from './dto/financeiro/create-financeiro.dto';
import { getMonth, getYear } from './utils/financeiro.utils';



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
            throw new NotFoundException('Categoria Not Found!');
        }

        return categoria
    }

    async findAllCategoria(){
        return await this.categoriaRepository.find()
    }


    // EntradasFinanceira Service

    async createEntradaFinanceira(data: CreateEntradaFinanceiraDto){
        await this.findOneCategoria(data.categoria_id)
        const mesAtual = getMonth()
        const anoAtual = getYear()

        if(data.credito === true && data.parcelas){
            const entradas: Array<CreateEntradaFinanceiraDto> = []

            for(let i = 0; i < data.parcelas ; i++){

                let mes = mesAtual + i
                if(mesAtual === 12) {
                    mes = 1
                }

                const entradaObj: CreateEntradaFinanceiraDto = {
                    ...data,
                    ano: anoAtual,
                    mes: mes,  
                }
                entradas.push(entradaObj)
            }


            await this.entradasFinanceiraRepository.save(entradas)
            await this.updateOrCreateFinanceiro(data)
        }
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
            throw new NotFoundException('Entrada Financeira Not Found!')
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
            throw new NotFoundException('Entradas by Categoria Not Found!');
        }

    }


 // Financeiro Services

    async updateOrCreateFinanceiro(data: CreateEntradaFinanceiraDto){
        const financeiro = await this.financeiroRepository.findOne({
            where: {
                mes: data.mes,
                ano: data.ano,
            }
        })

        let valor_entrada = 0
        let valor_despesa = 0
        
        if(data.tipo === TipoCategoriaEnum.DESPESA){
            valor_despesa = data.valor
        } else if (data.tipo === TipoCategoriaEnum.ENTRADA){
            valor_entrada = data.valor
        }

        const valormes = valor_entrada - valor_despesa

        if(!financeiro){
            await this.financeiroRepository.save({
                ano: getYear(),
                mes: getMonth(),
                valor_total_entrada_mes: valor_entrada,
                valor_total_despesa_mes: valor_despesa,
                valor_final_mes: valormes,
            })
            
        } else if(financeiro){
            const total_entrada = financeiro.valor_total_entrada_mes + valor_entrada
            const total_despesa = financeiro.valor_total_despesa_mes + valor_despesa 
            const valor_final = total_entrada - total_despesa
            return await this.financeiroRepository.update(financeiro.id, {
                valor_total_entrada_mes: total_entrada,
                valor_total_despesa_mes: total_despesa,
                valor_final_mes: valor_final,
            })
        } else{
            throw new Error('Não foi possível criar ou atualizar o financeiro!');
        } 
    }


    
}


