import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ExercisesModule } from './exercises/exercises.module';
import { TemplatesModule } from './templates/templates.module';

import { Exercise } from './exercises/entities/exercises.entity';
import { Template } from './templates/entities/templates.entity';
import { TemplateExercise } from './templates/entities/template_exercises.entity';
import { TemplateExercisesSets } from './templates/entities/template_exercises_sets.entity';

@Module({
  controllers: [],
  providers: [],
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '5432', 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Exercise, Template, TemplateExercise, TemplateExercisesSets],
    }),
    ExercisesModule,
    TemplatesModule,
  ],
})
export class AppModule {}
