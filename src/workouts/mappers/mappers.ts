import { ApiProperty } from '@nestjs/swagger';
import { Workout } from '../entities/workouts.entity';

export class ShortWorkoutDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  isDone: boolean;
  @ApiProperty()
  createdAt: Date;

  constructor(dto: ShortWorkoutDto) {
    this.id = dto.id;
    this.isDone = dto.isDone;
    this.createdAt = dto.createdAt;
  }
}

// TODO: remove this mapper when WorkoutDto is ready
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

export class WorkoutExerciseSetDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  position: number;
  @ApiProperty()
  isDone: boolean;

  @ApiProperty()
  reps?: number;

  @ApiProperty()
  weight?: number;

  @ApiProperty()
  time?: number;

  constructor(data: WorkoutExerciseSetDto) {
    this.id = data.id;
    this.position = data.position;
    this.isDone = data.isDone;
    this.reps = data.reps;
    this.weight = data.weight;
    this.time = data.time;
  }
}

export class WorkoutExerciseDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  position: number;
  @ApiProperty({ type: ExerciseDto })
  exercise: ExerciseDto;
  @ApiProperty({ type: [WorkoutExerciseSetDto] })
  sets: WorkoutExerciseSetDto[];

  constructor(data: WorkoutExerciseDto) {
    this.id = data.id;
    this.position = data.position;
    this.exercise = data.exercise;
    this.sets = data.sets;
  }
}

export class WorkoutDetailsDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  isDone: boolean;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty({ type: [WorkoutExerciseDto] })
  workoutExercises: WorkoutExerciseDto[];

  constructor(data: WorkoutDetailsDto) {
    this.id = data.id;
    this.isDone = data.isDone;
    this.createdAt = data.createdAt;
    this.workoutExercises = data.workoutExercises;
  }
}

export const shortWorkoutMapper = (entity: Workout) =>
  new ShortWorkoutDto({
    id: entity.id,
    isDone: entity.isDone,
    createdAt: entity.createdAt,
  });

export const templatesListMapper = (entities: Workout[]) =>
  entities.map((entity) => shortWorkoutMapper(entity));

export const detailsWorkoutMapper = (entity: Workout) => {
  return new WorkoutDetailsDto({
    id: entity.id,
    isDone: entity.isDone,
    createdAt: entity.createdAt,
    workoutExercises: entity.workoutExercises.map((exercise) => {
      return new WorkoutExerciseDto({
        id: exercise.id,
        position: exercise.position,
        exercise: new ExerciseDto({
          id: exercise.exercise.id,
          name: exercise.exercise.name,
        }),
        sets: exercise.sets.map(
          (set) =>
            new WorkoutExerciseSetDto({
              id: set.id,
              position: set.position,
              isDone: set.isDone,
              reps: set.reps,
              weight: set.weight,
              time: set.time,
            }),
        ),
      });
    }),
  });
};
