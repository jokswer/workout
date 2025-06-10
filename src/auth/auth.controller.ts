import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { isValid } from '@telegram-apps/init-data-node';
import { AuthService } from './auth.service';
import { WebAppInitDto } from './schemas/webAppInit.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/web-app-init')
  public webAppInit(@Body() body: WebAppInitDto) {
    const { initData } = body;

    const isInitDataValid = isValid(initData, process.env.BOT_TOKEN ?? '');

    if (!isInitDataValid) {
      throw new BadRequestException('AUTH__INVALID_INITDATA');
    }

    return this.authService.webAppInit(initData);
  }
}
