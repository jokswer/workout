import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplateExercise } from 'src/templates/entities/template_exercises.entity';
import { ExercisesController } from './exercises.controller';
import { ExercisesService } from './exercises.service';
import { Exercise } from './entities/exercises.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Exercise, TemplateExercise])],
  controllers: [ExercisesController],
  providers: [ExercisesService],
})
export class ExercisesModule {}
