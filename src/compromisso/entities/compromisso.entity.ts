import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { DiaSemanaEnum } from "src/common/enum/dia-semana.enum";
import { TipoCompromissoEnum } from "../enum/tipo-compromisso.enum";
import { UserEntity } from "src/user/entities/user.entity";

@Entity({ name: 'compromisso'})
export class CompromissoEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    desc: string;

    @Column()
    horario: number;

    @Column({
        type: 'enum',
        enum: TipoCompromissoEnum
    })
    tipo: TipoCompromissoEnum;

    @Column({ default: false })
    veiculo: boolean;

    @Column()
    data: Date;

    @Column({
        type: 'enum',
        enum: DiaSemanaEnum
    })
    dia_semana?: DiaSemanaEnum

    @Column({ default: true })
    anonimo: boolean;

    @ManyToMany(()=> UserEntity, user => user.compromissos)
    @JoinTable()
    usuario: UserEntity[];
}