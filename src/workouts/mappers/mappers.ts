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

export const shortWorkoutMapper = (entity: Workout) =>
  new ShortWorkoutDto({
    id: entity.id,
    isDone: entity.isDone,
    createdAt: entity.createdAt,
  });

export const templatesListMapper = (entities: Workout[]) =>
  entities.map((entity) => shortWorkoutMapper(entity));
