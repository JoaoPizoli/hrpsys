import { IsEnum, IsString } from "class-validator";
import { TipoCategoriaEnum } from "../enum/tipo-categoria.enum";


export class CreateCategoriaDto {

    @IsString()
    nome: string;

    @IsEnum(TipoCategoriaEnum)
    tipo: TipoCategoriaEnum;

}