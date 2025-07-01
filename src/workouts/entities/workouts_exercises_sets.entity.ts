import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  ForeignKey,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { WorkoutExercise } from './workouts_exercises.entity';

@Entity({ name: 'workouts_exercises_sets' })
export class WorkoutExerciseSet {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ name: 'workout_exercise_id', type: 'uuid', nullable: false })
  @ForeignKey<WorkoutExercise>(() => WorkoutExercise)
  workoutExerciseId: string;

  @ApiProperty()
  @Column({ type: 'smallint', nullable: false })
  position: number;

  @ApiProperty()
  @Column({ name: 'reps', type: 'smallint', nullable: true })
  reps?: number;

  @ApiProperty()
  @Column({
    name: 'weight',
    type: 'numeric',
    precision: 6,
    scale: 2,
    nullable: true,
  })
  weight?: number;

  @ApiProperty()
  @Column({
    name: 'time',
    type: 'numeric',
    precision: 6,
    scale: 2,
    nullable: true,
  })
  time?: number;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
