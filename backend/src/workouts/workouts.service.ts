import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class WorkoutsService {
  constructor(private readonly prisma: PrismaService) { }
  async create(createWorkoutDto: CreateWorkoutDto) {
    return await this.prisma.workout.create({
      data: createWorkoutDto
    })
  }

  async findAll() {
    return await this.prisma.workout.findMany();
  }

  async findOne(id: string) {
    const workout = await this.prisma.workout.findUnique({
      where: { id }
    });

    if (!workout) {
      throw new NotFoundException(`Workout with ID ${id} is not found.`);
    }

    return workout;
  }

  async update(id: string, updateWorkoutDto: UpdateWorkoutDto) {
    await this.findOne(id);
    return await this.prisma.workout.update({
      where: { id },
      data: updateWorkoutDto
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.prisma.workout.delete({
      where: { id }
    });
  }
}
