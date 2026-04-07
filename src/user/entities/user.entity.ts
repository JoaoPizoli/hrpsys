import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CompromissoEntity } from "src/compromisso/entities/compromisso.entity";
import { RotinaEntity } from "src/rotina/entities/rotina.entity";

@Entity({ name: 'user'})
export class UserEntity {
    @PrimaryGeneratedColumn({ type: 'number' })
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(()=> RotinaEntity, rotina => rotina.user)
    rotina: RotinaEntity[]; 

    @ManyToMany(()=> CompromissoEntity, comp => comp.usuario)
    compromissos: CompromissoEntity[];
}