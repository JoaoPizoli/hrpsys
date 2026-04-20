import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CategoriaFinanceiroEntity } from "./categoria_financeiro.entity";
import { TipoCategoriaEnum } from "../enum/tipo-categoria.enum";

@Entity({ name: 'entrada_financeiro' })
export class EntradaFinanceiroEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @ManyToOne(() => CategoriaFinanceiroEntity, c => c.entradas_financeiro)
    @JoinColumn({ name: 'categoria_id' })
    categorias: CategoriaFinanceiroEntity;

    @Column()
    categoria_id: number;

    @Column()
    valor: number;

    @Column({ type: 'enum', enum: TipoCategoriaEnum })
    tipo: TipoCategoriaEnum;

    @Column()
    ano: number;

    @Column()
    mes: number;

    @Column({ default: false })
    recorrente: boolean;

    @Column({ default: false })
    credito?: boolean;

    @Column({ default: 0 })
    parcelas?: number;

    @Column({ default: false })
    pago: boolean;

    @Column()
    data_vencimento?: Date;

    @Column()
    data_cobranca?: Date;

    @Column({ default: false })
    notificar: boolean;

    @CreateDateColumn()
    createdAt: Date;

}