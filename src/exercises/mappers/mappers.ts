import { ApiProperty } from '@nestjs/swagger';
import { Exercise } from '../entities/exercises.entity';

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

export const exerciseMapper = (entity: Exercise) => new ExerciseDto(entity);

export const exerciseListMapper = (entities: Exercise[]) =>
  entities.map(exerciseMapper);
