import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Workout } from './entities/workouts.entity';
import { WorkoutDto } from './schemas/workout.schema';
import { shortWorkoutMapper, templatesListMapper } from './mappers/mappers';

@Injectable()
export class WorkoutsService {
  constructor(
    @InjectRepository(Workout)
    private readonly workoutsRepository: Repository<Workout>,
  ) {}

  public async createWorkout(userId: string, dto?: WorkoutDto) {
    if (!dto) {
      const newWorkout = await this.createEmptyWorkout(userId);
      return shortWorkoutMapper(newWorkout);
    }

    return { success: true };
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

  private async createEmptyWorkout(userId: string) {
    const workout = this.workoutsRepository.create({ userId });
    return await this.workoutsRepository.save(workout);
  }
}
