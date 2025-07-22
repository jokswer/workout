import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplatesModule } from 'src/templates/templates.module';
import { WorkoutsService } from './workouts.service';
import { WorkoutsController } from './workouts.controller';
import { Workout } from './entities/workouts.entity';
import { WorkoutExercise } from './entities/workouts_exercises.entity';
import { WorkoutExerciseSet } from './entities/workouts_exercises_sets.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Workout, WorkoutExercise, WorkoutExerciseSet]),
    TemplatesModule,
  ],
  controllers: [WorkoutsController],
  providers: [WorkoutsService],
})
export class WorkoutsModule {}
