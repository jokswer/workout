import { Module } from '@nestjs/common';
import { ExercisesModule } from './exercises/exercises.module';

@Module({
  controllers: [],
  providers: [],
  imports: [ExercisesModule],
})
export class AppModule {}
