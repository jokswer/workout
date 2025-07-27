import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
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
  @Column({ type: 'smallint', nullable: false })
  position: number;

  @ApiProperty()
  @Column({ name: 'is_done', type: 'boolean', default: false, nullable: false })
  isDone: boolean;

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

  @ManyToOne(() => WorkoutExercise, (workoutExercise) => workoutExercise.sets)
  @JoinColumn({ name: 'workout_exercise_id' })
  workoutExercise: WorkoutExercise;
}
