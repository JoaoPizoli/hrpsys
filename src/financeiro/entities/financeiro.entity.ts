import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: 'financeiro'})
export class FinanceiroEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    ano: number;

    @Column()
    mes: number;

    @Column({ default: 0 })
    valor_total_entrada_mes: number;

    @Column({ default: 0 })
    valor_total_despesa_mes: number;

    @Column({ default: 0 })
    valor_final_mes: number;

}