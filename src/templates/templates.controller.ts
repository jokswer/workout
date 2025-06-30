import {
  ApiOperation,
  ApiOkResponse,
  ApiTags,
  ApiNoContentResponse,
} from '@nestjs/swagger';
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
import { ZodValidationPipe } from 'src/utils/zodValidation.pipe';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { TemplatesService } from './templates.service';
import { TemplateDto, TemplateSchema } from './schemas/template.schema';
import { ShortTemplateDto, TemplateDetailsDto } from './mappers/mappers';

@ApiTags('Templates')
@Controller('templates')
export class TemplatesController {
  constructor(private readonly exercisesService: TemplatesService) {}

  @ApiOperation({ summary: 'Create a new template' })
  @ApiOkResponse({ type: ShortTemplateDto })
  @UseGuards(JwtAuthGuard)
  @Post()
  @UsePipes(new ZodValidationPipe(TemplateSchema))
  public createTemplate(
    @Body() createTemplateDto: TemplateDto,
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

  @ApiOperation({ summary: 'Get all user templates' })
  @ApiOkResponse({ type: [ShortTemplateDto] })
  @UseGuards(JwtAuthGuard)
  @Get()
  public getTemplates(@Req() req: Request) {
    const userId = req.user?.id;

    if (!userId) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return this.exercisesService.getAllUserTemplates(userId);
  }

  @ApiOperation({ summary: 'Get template by ID' })
  @ApiOkResponse({ type: TemplateDetailsDto })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public getTemplateById(@Req() req: Request, @Param('id') id: string) {
    const userId = req.user?.id;

    if (!userId || !id) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return this.exercisesService.getUserTemplateById({
      userId,
      templateId: id,
    });
  }

  @ApiOperation({ summary: 'Delete template by ID' })
  @ApiNoContentResponse()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  public async deleteTemplateById(
    @Req() req: Request,
    @Param('id') id: string,
  ) {
    const userId = req.user?.id;

    if (!userId || !id) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    const result = await this.exercisesService.deleteUserTemplateById({
      userId,
      templateId: id,
    });

    if (result.affected === 0) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  @ApiOperation({ summary: 'Edit template by ID' })
  @ApiOkResponse({ type: ShortTemplateDto })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @UsePipes(new ZodValidationPipe(TemplateSchema))
  public editTemplateById(
    @Req() req: Request,
    @Body() editTemplateDto: TemplateDto,
    @Param('id') id: string,
  ) {
    const userId = req.user?.id;

    if (!userId || !id) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return this.exercisesService.editUserTemplateById({
      userId,
      templateId: id,
      editTemplateDto,
    });
  }
}
