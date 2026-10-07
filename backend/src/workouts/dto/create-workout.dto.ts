import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateWorkoutSetDto } from './create-workout-set.dto';

export class CreateWorkoutDto {
    @IsString({ message: 'Note must be a string' })
    @IsOptional()
    note?: string;

    @IsArray({ message: 'Sets must be an array' })
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CreateWorkoutSetDto)
    set?: CreateWorkoutSetDto[]
}