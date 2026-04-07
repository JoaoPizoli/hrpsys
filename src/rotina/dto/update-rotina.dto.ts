import { PartialType } from "@nestjs/mapped-types";
import { CreateRotinaDto } from "./create-rotina.dto";
import { IsEnum, IsOptional } from "class-validator";
import { StatusEnum } from "../enum/status.enum";

export class UpdateRotinaDto extends PartialType(CreateRotinaDto){
    @IsOptional()
    @IsEnum(StatusEnum)
    status: StatusEnum;
}