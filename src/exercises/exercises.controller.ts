import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ExercisesService } from './exercises.service';
import { Exercise } from './entities/exercises.entity';

@ApiTags('Exercises')
@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @ApiOperation({ summary: 'Get all exercises' })
  @ApiOkResponse({ type: [Exercise] })
  @Get()
  public getAll() {
    return this.exercisesService.findAll();
  }

  @ApiOperation({ summary: 'Get exercise by id' })
  @ApiOkResponse({ type: Exercise })
  @Get(':id')
  public getById(@Param('id') id: string) {
    const parsedId = parseInt(id, 10);
    return this.exercisesService.findById(parsedId);
  }
}
