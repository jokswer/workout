import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplatesService } from './templates.service';
import { TemplatesController } from './templates.controller';
import { Template } from './entities/templates.entity';
import { TemplateExercise } from './entities/template_exercises.entity';
import { TemplateExercisesSets } from './entities/template_exercises_sets.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Template,
      TemplateExercise,
      TemplateExercisesSets,
    ]),
  ],
  providers: [TemplatesService],
  controllers: [TemplatesController],
})
export class TemplatesModule {}
