import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exercise } from './entities/exercises.entity';
import {
  ExerciseDto,
  exerciseListMapper,
  exerciseMapper,
} from './mappers/mappers';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(Exercise)
    private readonly usersRepository: Repository<Exercise>,
  ) {}

  public async findAll(): Promise<ExerciseDto[]> {
    const exercises = await this.usersRepository.find();
    return exerciseListMapper(exercises);
  }

  public async findById(id: number): Promise<ExerciseDto> {
    const exercise = await this.usersRepository.findOneBy({ id });
    if (!exercise) {
      throw new NotFoundException(`Exercise with id ${id} not found`);
    }
    return exerciseMapper(exercise);
  }
}
