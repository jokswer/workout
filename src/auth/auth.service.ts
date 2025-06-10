import { BadRequestException, Injectable } from '@nestjs/common';
import { parse } from '@telegram-apps/init-data-node';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  public async webAppInit(initData: string) {
    const { user } = parse(initData);

    if (!user || !user.id) {
      throw new BadRequestException('AUTH__INVALID_INITDATA');
    }

    const res = await this.loginViaTelegram(user);

    return res;
  }

  private async loginViaTelegram(user: any) {
    const dbUser = await this.usersService.getUserByTelegramId(user.id);

    if (dbUser) {
      return dbUser;
    }

    return await this.usersService.createUser(user);
  }
}
