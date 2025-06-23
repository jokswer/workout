import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { Request } from 'express';
import { ZodValidationPipe } from 'src/utils/zodValidation.pipe';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { TemplatesService } from './templates.service';
import { Template } from './entities/templates.entity';
import {
  CreateTemplateDto,
  CreateTemplateSchema,
} from './schemas/createTemplate.schema';

@ApiTags('Templates')
@Controller('templates')
export class TemplatesController {
  constructor(private readonly exercisesService: TemplatesService) {}

  @ApiOperation({ summary: 'Create a new template' })
  @ApiResponse({ status: HttpStatus.OK, type: Template })
  @UseGuards(JwtAuthGuard)
  @Post()
  @UsePipes(new ZodValidationPipe(CreateTemplateSchema))
  public createTemplate(
    @Body() createTemplateDto: CreateTemplateDto,
    @Req() req: Request,
  ) {
    const userId = req.user?.id;

    if (!userId) {
      throw new HttpException(
        'User ID not found in request',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return this.exercisesService.createUserTemplate(createTemplateDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  public getTemplates(@Req() req: Request) {
    const userId = req.user?.id;

    if (!userId) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return this.exercisesService.getAllUserTemplates(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public getTemplateById(@Req() req: Request) {
    const userId = req.user?.id;
    const templateId = req.params.id;

    if (!userId || !templateId) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return this.exercisesService.getUserTemplateById({ userId, templateId });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  public deleteTemplateById(@Req() req: Request) {
    const userId = req.user?.id;
    const templateId = req.params.id;

    if (!userId || !templateId) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return this.exercisesService.deleteUserTemplateById({ userId, templateId });
  }
}
