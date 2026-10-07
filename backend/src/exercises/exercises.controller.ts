import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';

@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) { }

  @Post()
  create(
    @Body() createExerciseDto: CreateExerciseDto
  ) {
    return this.exercisesService.create(createExerciseDto);
  }

  @Get()
  findAll() {
    return this.exercisesService.findAll();
  }

  @Get('muscle/:muscleGroup')
  findByMuscle(
    @Param('muscleGroup') muscle: string
  ) {
    return this.exercisesService.findByMuscle(muscle);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseUUIDPipe) id: string
  ) {
    return this.exercisesService.findOne(id);
  }

  @Patch(':id')
  updateOne(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateExerciseDto: UpdateExerciseDto,
  ) {
    return this.exercisesService.updateOne(id, updateExerciseDto);
  }

  @Delete(':id')
  deleteOne(
    @Param('id', ParseUUIDPipe) id: string
  ) {
    return this.exercisesService.deleteOne(id);
  }
}
