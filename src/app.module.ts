import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ExercisesModule } from './exercises/exercises.module';
import { TemplatesModule } from './templates/templates.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { WorkoutsModule } from './workouts/workouts.module';

import { Exercise } from './exercises/entities/exercises.entity';
import { Template } from './templates/entities/templates.entity';
import { TemplateExercise } from './templates/entities/template_exercises.entity';
import { TemplateExercisesSets } from './templates/entities/template_exercises_sets.entity';
import { User } from './users/entities/user.entity';
import { Workout } from './workouts/entities/workouts.entity';
import { WorkoutExercise } from './workouts/entities/workouts_exercises.entity';
import { WorkoutExerciseSet } from './workouts/entities/workouts_exercises_sets.entity';

@Module({
  controllers: [],
  providers: [],
  imports: [
    TypeOrmModule.forRoot({
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT!, 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        Exercise,
        Template,
        TemplateExercise,
        TemplateExercisesSets,
        User,
        Workout,
        WorkoutExercise,
        WorkoutExerciseSet,
      ],
    }),
    ExercisesModule,
    TemplatesModule,
    AuthModule,
    UsersModule,
    WorkoutsModule,
  ],
})
export class AppModule {}
