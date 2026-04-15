import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: 'financeiro'})
export class FinanceiroEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    valor_total_entrada_mes: number;

    @Column()
    valor_total_despesa_mes: number;

    @Column()
    valor_final_mes: number;

}