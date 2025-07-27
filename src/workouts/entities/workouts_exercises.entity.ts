import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exercise } from 'src/exercises/entities/exercises.entity';
import { Workout } from './workouts.entity';
import { WorkoutExerciseSet } from './workouts_exercises_sets.entity';

@Entity({ name: 'workouts_exercises' })
export class WorkoutExercise {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ type: 'smallint', nullable: false })
  position: number;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @ApiProperty()
  @ManyToOne(() => Workout, (workout) => workout.workoutExercises)
  @JoinColumn({ name: 'workout_id' })
  workout: Workout;

  @ManyToOne(() => Exercise, (exercise) => exercise.templateExercises)
  @JoinColumn({ name: 'exercise_id' })
  exercise: Exercise;

  @ApiProperty()
  @OneToMany(() => WorkoutExerciseSet, (sets) => sets.workoutExercise, {
    onDelete: 'CASCADE',
  })
  sets: WorkoutExerciseSet[];
}
