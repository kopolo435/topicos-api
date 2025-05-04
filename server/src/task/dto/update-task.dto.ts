import { IsString, IsBoolean, IsOptional, IsDateString } from "class-validator";

export class UpdateTaskDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsDateString()
    dueBy?: string;

    @IsOptional()
    @IsBoolean()
    important?: boolean;
}