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
import { TemplateExercise } from './template_exercises.entity';

@Entity({ name: 'template_exercises_sets' })
export class TemplateExercisesSets {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ name: 'template_exercises_id', type: 'uuid', nullable: false })
  templateExercisesId: string;

  @ApiProperty()
  @Column({ type: 'smallint', nullable: false })
  position: number;

  @ApiProperty()
  @Column({ name: 'default_reps', type: 'smallint', nullable: true })
  defaultReps: number;

  @ApiProperty()
  @Column({
    name: 'default_weight',
    type: 'numeric',
    precision: 6,
    scale: 2,
    nullable: true,
  })
  defaultWeight: number;

  @ApiProperty()
  @Column({
    name: 'default_time',
    type: 'numeric',
    precision: 6,
    scale: 2,
    nullable: true,
  })
  defaultTime: number;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => TemplateExercise, (te) => te.templateExercisesSets, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'template_exercises_id' })
  templateExercise: TemplateExercise;
}
