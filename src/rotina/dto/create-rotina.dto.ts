import { IsEnum, IsOptional, IsString } from "class-validator";
import { DiaSemanaEnum } from "src/common/enum/dia-semana.enum";

export class CreateRotinaDto {
    @IsString()
    desc: string;

    @IsEnum(DiaSemanaEnum)
    diaSemana: DiaSemanaEnum;

    @IsOptional()
    horario?: number;

    @IsOptional()
    tempo: number;
}