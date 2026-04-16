import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TipoCategoriaEnum } from "../enum/tipo-categoria.enum";
import { EntradaFinanceiroEntity } from "./entrada_financeiro.entity";
import { UserEntity } from "src/user/entities/user.entity";

@Entity({ name: 'categoria_financeiro'})
export class CategoriaFinanceiroEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column({ type: 'enum', enum: TipoCategoriaEnum })
    tipo: TipoCategoriaEnum;

    @OneToMany(()=> EntradaFinanceiroEntity, ef => ef.categorias)
    entradas_financeiro: EntradaFinanceiroEntity[];

    @ManyToOne(() => UserEntity, u => u.categoria_financeiro)
    @JoinColumn({ name: 'user_id'})
    user: UserEntity;

    @Column()
    user_id: number;
}