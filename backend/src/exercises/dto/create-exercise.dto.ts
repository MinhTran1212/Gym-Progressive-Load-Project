import { IsNotEmpty, IsString } from 'class-validator';

export class CreateExerciseDto {
  @IsString({ message: 'Exercise name must be a string' })
  @IsNotEmpty({ message: 'Exercise name cannot be empty' })
  name: string;

  @IsString({ message: 'Muscle group must be a string' })
  @IsNotEmpty({ message: 'Muscle group cannot be empty' })
  muscleGroup: string;
}
