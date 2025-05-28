import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
