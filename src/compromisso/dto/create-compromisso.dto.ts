import { IsBoolean, IsDate, IsEnum, IsNumber, IsOptional, IsString } from "class-validator"
import { DiaSemanaEnum } from "src/common/enum/dia-semana.enum"
import { TipoCompromissoEnum } from "../enum/tipo-compromisso.enum";

export class CreateCompromissoDto {
    @IsString()
    desc: string;

    @IsNumber()
    horario: number;

    @IsEnum(TipoCompromissoEnum)
    tipo: TipoCompromissoEnum;

    @IsBoolean()
    veiculo: boolean

    @IsDate()
    data: Date;

    @IsEnum(DiaSemanaEnum)
    @IsOptional()
    dia_semana?: DiaSemanaEnum;

    @IsBoolean()
    anonimo: boolean;
}