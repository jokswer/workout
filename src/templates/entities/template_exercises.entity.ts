import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Exercise } from 'src/exercises/entities/exercises.entity';
import { Template } from './templates.entity';
import { TemplateExercisesSets } from './template_exercises_sets.entity';

@Entity({ name: 'template_exercises' })
export class TemplateExercise {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ name: 'template_id', type: 'uuid', nullable: false })
  templateId: string;

  @ApiProperty()
  @Column({ name: 'exercise_id', type: 'int', nullable: false })
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

  @ManyToOne(() => Template, (template) => template.exercises, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'template_id' })
  template: Template;

  @ManyToOne(() => Exercise, (exercise) => exercise.templateExercises)
  @JoinColumn({ name: 'exercise_id' })
  exercise: Exercise;

  @OneToMany(() => TemplateExercisesSets, (sets) => sets.templateExercise, {
    cascade: true,
  })
  sets: TemplateExercisesSets[];
}
