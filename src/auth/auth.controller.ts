import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UsePipes,
} from '@nestjs/common';
import { isValid } from '@telegram-apps/init-data-node';
import { ZodValidationPipe } from 'src/utils/zodValidation.pipe';
import { WebAppInitDto, WebAppInitSchema } from './schemas/webAppInit.schema';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/web-app-init')
  @UsePipes(new ZodValidationPipe(WebAppInitSchema))
  public webAppInit(@Body() body: WebAppInitDto) {
    const { initData } = body;

    const isInitDataValid = isValid(initData, process.env.BOT_TOKEN!);

    if (!isInitDataValid) {
      throw new BadRequestException('Invalid data');
    }

    return this.authService.webAppInit(initData);
  }
}
