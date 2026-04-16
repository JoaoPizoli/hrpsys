import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CategoriaFinanceiroEntity } from "./categoria_financeiro.entity";

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

    @Column()
    mes: number;

    @Column()
    recorrente: boolean;

    @Column({ default: false })
    pago: boolean;

    @Column()
    data_vencimento?: Date;

    @Column()
    data_cobranca?: Date;

    @Column({ default: false })
    notificar: boolean;

    @Column()
    data_notificar: Date;

    @Column()
    hora_notificar: string;

    @CreateDateColumn()
    createdAt: Date;

}