import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { ExercisesService } from './exercises.service';
import { ExerciseDto } from './mappers/mappers';

@ApiTags('Exercises')
@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @ApiOperation({ summary: 'Get all exercises' })
  @ApiOkResponse({ type: [ExerciseDto] })
  @UseGuards(JwtAuthGuard)
  @Get()
  public getAll() {
    return this.exercisesService.findAll();
  }

  @ApiOperation({ summary: 'Get exercise by id' })
  @ApiOkResponse({ type: ExerciseDto })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public getById(@Param('id') id: string) {
    const parsedId = parseInt(id, 10);
    return this.exercisesService.findById(parsedId);
  }
}
