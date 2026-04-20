import { IsBoolean, IsDate, IsEnum, IsNumber, IsOptional, IsPositive, IsString, Max, Min } from "class-validator";
import { TipoCategoriaEnum } from "src/financeiro/enum/tipo-categoria.enum";


export class CreateEntradaFinanceiraDto {

    @IsString()
    nome: string;

    @IsNumber()
    @IsPositive()
    categoria_id: number;

    @IsNumber()
    @IsPositive()
    valor: number;

    @IsEnum(TipoCategoriaEnum)
    tipo: TipoCategoriaEnum;

    @IsNumber()
    @IsPositive()
    @Min(1)
    @Max(12)
    mes: number;

    @IsNumber()
    ano: number;

    @IsBoolean()
    recorrente: boolean;

    @IsNumber()
    @IsPositive()
    @Min(1)
    @IsOptional()
    parcelas?: number;

    @IsBoolean()
    @IsOptional()
    credito?: boolean;

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
}