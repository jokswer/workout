import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { Request } from 'express';
import {
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { ZodValidationPipe } from 'src/utils/zodValidation.pipe';
import { WorkoutsService } from './workouts.service';
import {
  EditWorkoutDto,
  EditWorkoutSchema,
  WorkoutDto,
  WorkoutSchema,
} from './schemas/workout.schema';
import { ShortWorkoutDto, WorkoutDetailsDto } from './mappers/mappers';

@ApiTags('Workouts')
@Controller('workouts')
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @ApiOperation({ summary: 'Create a new workout' })
  @ApiOkResponse({ type: ShortWorkoutDto })
  @UseGuards(JwtAuthGuard)
  @Post()
  @UsePipes(new ZodValidationPipe(WorkoutSchema))
  public createWorkout(
    @Body() createWorkoutDto: WorkoutDto,
    @Req() req: Request,
  ) {
    const userId = req.user?.id;

    if (!userId) {
      throw new HttpException(
        'User ID not found in request',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return this.workoutsService.createWorkout(userId, createWorkoutDto);
  }

  @ApiOperation({ summary: 'Get all user workouts' })
  @ApiOkResponse({ type: [ShortWorkoutDto] })
  @UseGuards(JwtAuthGuard)
  @Get()
  public getWorkouts(@Req() req: Request) {
    const userId = req.user?.id;

    if (!userId) {
      throw new HttpException(
        'User ID not found in request',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return this.workoutsService.getAllUserWorkouts(userId);
  }

  @ApiOperation({ summary: 'Get workout by ID' })
  @ApiOkResponse({ type: WorkoutDetailsDto })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public getWorkoutById(@Req() req: Request, @Param('id') id: string) {
    const userId = req.user?.id;

    if (!userId) {
      throw new HttpException(
        'User ID not found in request',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return this.workoutsService.getUserWorkoutById({ userId, workoutId: id });
  }

  @ApiOperation({ summary: 'Edit workout by ID' })
  @ApiNoContentResponse()
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @UsePipes(new ZodValidationPipe(EditWorkoutSchema))
  public editWorkout(
    @Req() req: Request,
    @Body() editWorkoutDto: EditWorkoutDto,
    @Param('id') id: string,
  ) {
    const userId = req.user?.id;

    if (!userId) {
      throw new HttpException(
        'User ID not found in request',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return this.workoutsService.editWorkoutById({
      userId,
      workoutId: id,
      editWorkoutDto,
    });
  }

  @ApiOperation({ summary: 'Delete workout by ID' })
  @ApiNoContentResponse()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  public async deleteWorkout(@Req() req: Request, @Param('id') id: string) {
    const userId = req.user?.id;

    if (!userId) {
      throw new HttpException(
        'User ID not found in request',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const result = await this.workoutsService.deleteWorkoutById({
      userId,
      workoutId: id,
    });

    if (result.affected === 0) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }
}
