import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExercisesModule } from './exercises/exercises.module';
import { PrismaModule } from './prisma/prisma.module';
import { WorkoutsModule } from './workouts/workouts.module';

@Module({
  imports: [PrismaModule, ExercisesModule, WorkoutsModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
