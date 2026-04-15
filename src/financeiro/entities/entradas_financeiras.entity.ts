import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CategoriasEntity } from "./categorias.entity";

@Entity({ name: 'entradas_financeira' })
export class EntradasFinanceiraEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @ManyToOne(() => CategoriasEntity, c => c.entradas_financeiro)
    @JoinColumn({ name: 'categoria_id' })
    categorias: CategoriasEntity;

    @Column()
    categoria_id: number;

    @Column()
    valor: number;

    @Column()
    mensal: boolean;

    @Column()
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