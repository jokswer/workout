import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { TParsedUser } from 'src/auth/auth.service';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async getUserByTelegramId(id: number) {
    return await this.userRepository.findOneBy({
      tgUserId: id ? id : IsNull(),
    });
  }

  public async getUserById(id: string) {
    const user = await this.userRepository.findOneBy({
      id: id ? id : IsNull(),
    });
    return user;
  }

  public async createUser(userData: TParsedUser) {
    const newUser = this.userRepository.create({
      tgUserId: userData.id,
      firstName: userData.first_name,
      lastName: userData.last_name,
      username: userData.username,
      languageCode: userData.language_code,
      photoUrl: userData.photo_url,
    });

    return await this.userRepository.save(newUser);
  }
}
