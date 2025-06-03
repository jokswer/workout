import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { Template } from './entities/templates.entity';
import { CreateTemplateDto } from './dtos/createTemplate.dto';

@ApiTags('Templates')
@Controller('templates')
export class TemplatesController {
  constructor(private readonly exercisesService: TemplatesService) {}

  @ApiOperation({ summary: 'Create a new template' })
  @ApiResponse({ status: HttpStatus.OK, type: Template })
  @Post()
  public createTemplate(@Body() createTemplateDto: CreateTemplateDto) {
    return this.exercisesService.create(createTemplateDto);
  }
}
