import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TipoCategoriaEnum } from "../enum/tipo-categoria.enum";
import { EntradasFinanceiraEntity } from "./entradas_financeiras.entity";

@Entity({ name: 'categoria_financeiro'})
export class CategoriasEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column({ type: 'enum', enum: TipoCategoriaEnum })
    tipo: TipoCategoriaEnum;

    @OneToMany(()=> EntradasFinanceiraEntity, ef => ef.categorias)
    entradas_financeiro: EntradasFinanceiraEntity[];

}