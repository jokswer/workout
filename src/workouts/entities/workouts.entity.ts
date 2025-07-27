import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  ForeignKey,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { WorkoutExercise } from './workouts_exercises.entity';

@Entity({ name: 'workouts' })
export class Workout {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ name: 'user_id', type: 'uuid', nullable: false })
  @ForeignKey<User>(() => User)
  userId: string;

  @ApiProperty()
  @Column({ name: 'is_done', type: 'boolean', default: false, nullable: false })
  isDone: boolean;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @OneToMany(() => WorkoutExercise, (we) => we.workout, { onDelete: 'CASCADE' })
  workoutExercises: WorkoutExercise[];
}
