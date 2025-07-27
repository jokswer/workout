import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, IsNull, Repository } from 'typeorm';
import { TemplatesService } from 'src/templates/templates.service';
import { Workout } from './entities/workouts.entity';
import { WorkoutExercise } from './entities/workouts_exercises.entity';
import { WorkoutExerciseSet } from './entities/workouts_exercises_sets.entity';
import { WorkoutDto } from './schemas/workout.schema';
import {
  detailsWorkoutMapper,
  shortWorkoutMapper,
  templatesListMapper,
} from './mappers/mappers';

type TUserWorkoutByIdArgs = {
  userId: string;
  workoutId: string;
};

type TCreateWorkoutFromTemplateArgs = {
  userId: string;
  templateId: string;
};

@Injectable()
export class WorkoutsService {
  constructor(
    @InjectRepository(Workout)
    private readonly workoutsRepository: Repository<Workout>,
    private readonly templatesService: TemplatesService,
    private readonly dataSource: DataSource,
  ) {}

  public async createWorkout(userId: string, dto?: WorkoutDto) {
    if (dto?.templateId) {
      const newWorkout = await this.createWorkoutFromTemplate({
        templateId: dto.templateId,
        userId,
      });
      return shortWorkoutMapper(newWorkout);
    }

    const newWorkout = await this.createEmptyWorkout(userId);
    return shortWorkoutMapper(newWorkout);
  }

  public async getAllUserWorkouts(userId: string) {
    const workouts = await this.workoutsRepository.find({
      select: {
        id: true,
        isDone: true,
        createdAt: true,
      },
      where: { userId: userId ?? IsNull() },
    });

    return templatesListMapper(workouts);
  }

  public deleteWorkoutById({ userId, workoutId }: TUserWorkoutByIdArgs) {
    return this.workoutsRepository.delete({ id: workoutId, userId });
  }

  public async getUserWorkoutById({ userId, workoutId }: TUserWorkoutByIdArgs) {
    const workout = await this.workoutsRepository.findOne({
      select: {
        id: true,
        isDone: true,
        createdAt: true,
        workoutExercises: {
          id: true,
          position: true,
          exercise: true,
          sets: {
            id: true,
            isDone: true,
            position: true,
            reps: true,
            weight: true,
            time: true,
          },
        },
      },
      relations: { workoutExercises: { sets: true, exercise: true } },
      where: { id: workoutId ?? IsNull(), userId: userId ?? IsNull() },
    });

    if (!workout) {
      throw new NotFoundException(`Workout with id ${workoutId} not found`);
    }

    return detailsWorkoutMapper(workout);
  }

  private async createEmptyWorkout(userId: string) {
    const workout = this.workoutsRepository.create({ userId });
    return await this.workoutsRepository.save(workout);
  }

  private async createWorkoutFromTemplate({
    templateId,
    userId,
  }: TCreateWorkoutFromTemplateArgs) {
    const template = await this.templatesService.getUserTemplateById({
      userId,
      templateId,
    });

    if (!template) {
      throw new NotFoundException(`Template with id ${templateId} not found`);
    }

    return await this.dataSource.transaction(async (manager) => {
      const workout = manager.create(Workout, { userId });
      await manager.save(workout);

      if (!template?.exercises?.length) {
        return workout;
      }

      for (const exercise of template?.exercises ?? []) {
        const workoutExercise = manager.create(WorkoutExercise, {
          workout,
          exerciseId: exercise.exercise.id,
          position: exercise.position,
        });
        await manager.save(workoutExercise);

        for (const set of exercise.sets ?? []) {
          const workoutExerciseSet = manager.create(WorkoutExerciseSet, {
            workoutExercise,
            position: set.position,
            reps: set.defaultReps,
            weight: set.defaultWeight,
            time: set.defaultTime,
          });
          await manager.save(workoutExerciseSet);
        }
      }

      return workout;
    });
  }
}
