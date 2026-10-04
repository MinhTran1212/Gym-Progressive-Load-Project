import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { Exercise } from './entities/exercise.entity';

@Injectable()
export class ExercisesService {
  private exercises: Exercise[] = [
    { id: 1, name: "Barbell Bench Press", muscleGroup: "Chest" },
    { id: 2, name: "Barbell Overhead Press", muscleGroup: "Shoulder" },
    { id: 3, name: "Barbell Squat", muscleGroup: "Leg" }
  ];

  findAll(): Exercise[] {
    return this.exercises;
  }

  findOne(id: number): Exercise {
    const exercise = this.exercises.find((ex) => ex.id === id);
    if (!exercise) {
      throw new NotFoundException(`Exercise with ID ${id} not found`)
    }
    return exercise
  }

  create(createExerciseDto: CreateExerciseDto): Exercise {
    const newExercise: Exercise = {
      id: Date.now(),
      ...createExerciseDto,
    };
    this.exercises.push(newExercise);
    return newExercise;
  }

  findByMuscle(muscleGroup: string): Exercise[] {
    const newExercises = this.exercises.filter(
      (ex) => ex.muscleGroup.toLowerCase() === muscleGroup.toLowerCase()
    );
    return newExercises;
  }

  deleteOne(id: number) {
    this.findOne(id);
    this.exercises = this.exercises.filter((ex) => ex.id !== id);
    return { success: true }
  }

  updateOne(id: number, updateExerciseDto: UpdateExerciseDto) {
    const exercise = this.findOne(id);
    Object.assign(exercise, updateExerciseDto);
    return exercise;
  }
}
