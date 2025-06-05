import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, HttpStatus, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'src/utils/zodValidation.pipe';
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
  @Post()
  @UsePipes(new ZodValidationPipe(CreateTemplateSchema))
  public createTemplate(@Body() createTemplateDto: CreateTemplateDto) {
    return this.exercisesService.create(createTemplateDto);
  }
}
