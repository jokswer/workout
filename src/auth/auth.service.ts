import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { parse } from '@telegram-apps/init-data-node';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { KeysToSnakeCase } from 'src/utils/typesTransform';

type TParsedInitData = ReturnType<typeof parse>;
export type TParsedUser = KeysToSnakeCase<
  Required<Pick<TParsedInitData, 'user'>>['user']
>;
export type TJwtPayload = {
  userId: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async webAppInit(initData: string) {
    const { user } = parse(initData);

    if (!user || !user.id) {
      throw new BadRequestException('Invalid data');
    }

    const dbUser = await this.loginViaTelegram(user);
    const token = await this.createToken(dbUser);

    return token;
  }

  public async validateUser({ userId }: TJwtPayload) {
    const user = await this.usersService.getUserById(userId);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  private async loginViaTelegram(user: TParsedUser) {
    const dbUser = await this.usersService.getUserByTelegramId(user.id);

    if (dbUser) {
      return dbUser;
    }

    return await this.usersService.createUser(user);
  }

  private async createToken({ id }: User) {
    const payload: TJwtPayload = { userId: id };
    const accessToken = await this.jwtService.signAsync(payload);
    return {
      accessToken,
    };
  }
}
