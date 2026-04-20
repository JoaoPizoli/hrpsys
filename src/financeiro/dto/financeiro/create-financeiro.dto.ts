import { IsInt, IsNumber, IsPositive, Max, Min } from "class-validator";


export class CreateFinanceiroDto {

    @IsNumber()
    @IsPositive()
    @Min(2025)
    ano: number;

    @IsNumber()
    @IsInt()
    @IsPositive()
    @Min(0)
    @Max(12)
    mes: number;

    @IsNumber()
    valor: number;
}