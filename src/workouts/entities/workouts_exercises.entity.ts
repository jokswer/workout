import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  ForeignKey,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exercise } from 'src/exercises/entities/exercises.entity';
import { Workout } from './workouts.entity';

@Entity({ name: 'workouts_exercises' })
export class WorkoutExercise {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ name: 'workout_id', type: 'uuid', nullable: false })
  @ForeignKey<Workout>(() => Workout)
  workoutId: string;

  @ApiProperty()
  @Column({ name: 'exercise_id', type: 'int4', nullable: false })
  @ForeignKey<Exercise>(() => Exercise)
  exerciseId: number;

  @ApiProperty()
  @Column({ type: 'smallint', nullable: false })
  position: number;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
