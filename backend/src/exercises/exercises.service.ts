import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';

@Injectable()
export class ExercisesService {
  constructor(private readonly prisma: PrismaService) { }

  async findAll() {
    return await this.prisma.exercise.findMany();
  }

  async findOne(id: string) {
    const exercise = await this.prisma.exercise.findUnique({
      where: { id }
    });

    if (!exercise) {
      throw new NotFoundException(`Exercise with ID ${id} not found`);
    }

    return exercise;
  }

  async create(createExerciseDto: CreateExerciseDto) {
    return await this.prisma.exercise.create({
      data: createExerciseDto
    });
  }

  async findByMuscle(muscleGroup: string) {
    return await this.prisma.exercise.findMany({
      where: {
        muscleGroup: {
          equals: muscleGroup,
          mode: 'insensitive',
        }
      }
    });
  }

  async deleteOne(id: string) {
    await this.findOne(id);
    return await this.prisma.exercise.delete({
      where: { id }
    });
  }

  async updateOne(id: string, updateExerciseDto: UpdateExerciseDto) {
    await this.findOne(id);
    return await this.prisma.exercise.update({
      where: { id },
      data: updateExerciseDto
    });
  }
}
