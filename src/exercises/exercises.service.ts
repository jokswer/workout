import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exercise } from './exercises.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(Exercise)
    private readonly usersRepository: Repository<Exercise>,
  ) {}

  public async findAll(): Promise<Exercise[]> {
    return await this.usersRepository.find();
  }
}
