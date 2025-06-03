import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { TemplateExercise } from 'src/templates/entities/template_exercises.entity';

@Entity('exercises')
export class Exercise {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier for the exercise',
  })
  @PrimaryGeneratedColumn({ type: 'int4' })
  id: number;
  @ApiProperty({
    example: 'Армейский жим',
  })
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @OneToMany(() => TemplateExercise, (te) => te.exercise)
  templateExercises: TemplateExercise[];
}
