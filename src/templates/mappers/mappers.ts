import { ApiProperty } from '@nestjs/swagger';
import { Template } from '../entities/templates.entity';

export class ShortTemplateDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description?: string;

  constructor(dto: ShortTemplateDto) {
    this.id = dto.id;
    this.name = dto.name;
    this.description = dto.description;
  }
}

export class TemplateExerciseSetDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  position: number;

  @ApiProperty()
  defaultReps?: number;

  @ApiProperty()
  defaultWeight?: number;

  @ApiProperty()
  defaultTime?: number;

  constructor(data: TemplateExerciseSetDto) {
    this.id = data.id;
    this.position = data.position;
    this.defaultReps = data.defaultReps;
    this.defaultWeight = data.defaultWeight;
    this.defaultTime = data.defaultTime;
  }
}

export class ExerciseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  constructor(data: ExerciseDto) {
    this.id = data.id;
    this.name = data.name;
  }
}

export class TemplateExerciseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  position: number;

  @ApiProperty({ type: ExerciseDto })
  exercise: ExerciseDto;

  @ApiProperty({ type: () => [TemplateExerciseSetDto] })
  sets: TemplateExerciseSetDto[];

  constructor(data: TemplateExerciseDto) {
    this.id = data.id;
    this.position = data.position;
    this.exercise = data.exercise;
    this.sets = data.sets;
  }
}

export class TemplateDetailsDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description?: string;

  @ApiProperty({ type: () => [TemplateExerciseDto] })
  exercises: TemplateExerciseDto[];

  constructor(data: TemplateDetailsDto) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.exercises = data.exercises;
  }
}

export const shortTemplateMapper = (entity: Template) =>
  new ShortTemplateDto({
    id: entity.id,
    name: entity.name,
    description: entity.description,
  });

export const templatesListMapper = (entities: Template[]) =>
  entities.map((entity) => shortTemplateMapper(entity));

export const templateDetailsMapper = (entity: Template) =>
  new TemplateDetailsDto({
    id: entity.id,
    name: entity.name,
    description: entity.description,
    exercises: entity.exercises.map(
      (exercise) =>
        new TemplateExerciseDto({
          id: exercise.id,
          position: exercise.position,
          exercise: {
            id: exercise.exercise.id,
            name: exercise.exercise.name,
          },
          sets: exercise.sets.map(
            (set) =>
              new TemplateExerciseSetDto({
                id: set.id,
                position: set.position,
                defaultReps: set.defaultReps,
                defaultWeight: set.defaultWeight,
                defaultTime: set.defaultTime,
              }),
          ),
        }),
    ),
  });
