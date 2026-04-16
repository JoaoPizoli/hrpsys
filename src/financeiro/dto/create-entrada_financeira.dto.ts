import { IsBoolean, IsDate, IsNumber, IsOptional, IsPositive, IsString, Max, Min } from "class-validator";
import { TipoCategoriaEnum } from "../enum/tipo-categoria.enum";

export class CreateEntradaFinanceiraDto {

    @IsString()
    nome: string;

    @IsNumber()
    @IsPositive()
    categoria_id: number;

    @IsNumber()
    @IsPositive()
    valor: number;

    @IsNumber()
    @IsPositive()
    @Min(1)
    @Max(12)
    mes: number;

    @IsBoolean()
    recorrente: boolean;

    @IsBoolean()
    pago: boolean;

    @IsDate()
    @IsOptional()
    data_vencimento?: Date;

    @IsDate()
    @IsOptional()
    data_cobranca?: Date;

    @IsBoolean()
    notificar: boolean;

    @IsDate()
    data_notificar: Date;

    @IsString()
    hora_notificar: string;
}