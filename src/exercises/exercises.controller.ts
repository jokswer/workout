import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ExercisesService } from './exercises.service';
import { Exercise } from './exercises.entity';

@ApiTags('Exercises')
@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @ApiOperation({ summary: 'Get all exercises' })
  @ApiResponse({ status: 200, type: [Exercise] })
  @Get()
  public getAll() {
    return this.exercisesService.findAll();
  }
}
