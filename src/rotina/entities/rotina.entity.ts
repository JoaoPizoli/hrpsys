import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { DiaSemanaEnum } from "src/common/enum/dia-semana.enum";
import { StatusEnum } from "../enum/status.enum";
import { UserEntity } from "src/user/entities/user.entity";

@Entity({ name: 'rotina'})
export class RotinaEntity {
    @PrimaryGeneratedColumn({ type: 'number'})
    id: number;

    @Column()
    desc: string;

    @Column({
        type: 'enum',
        enum: DiaSemanaEnum
    })
    diaSemana: DiaSemanaEnum

    @Column()
    horario?: number;

    @Column()
    tempo?: number;

    @Column({
        type: 'enum',
        enum: StatusEnum,
        default: StatusEnum.PENDENTE
    })
    status: StatusEnum;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(()=> UserEntity, usr => usr.rotina)
    @JoinColumn({ name: 'user_id'})
    user: UserEntity;

    @Column()
    user_id: number;
}