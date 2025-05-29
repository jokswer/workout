import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exercise } from './exercises.entity';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(Exercise)
    private readonly usersRepository: Repository<Exercise>,
  ) {}

  public async findAll(): Promise<Exercise[]> {
    return await this.usersRepository.find();
  }

  public async findById(id: number): Promise<Exercise | null> {
    return await this.usersRepository.findOneBy({ id });
  }
}
