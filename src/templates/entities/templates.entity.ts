import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TemplateExercise } from './template_exercises.entity';

@Entity('templates')
export class Template {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @Column({ type: 'uuid', nullable: false })
  // userId: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @OneToMany(() => TemplateExercise, (te) => te.template)
  exercises: TemplateExercise[];
}
