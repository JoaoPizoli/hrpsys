import { PartialType } from "@nestjs/mapped-types";
import { CreateEntradaFinanceiraDto } from "./create-entrada_financeira.dto";


export class UpdateEntradaFinanceiraDto extends PartialType(CreateEntradaFinanceiraDto){}