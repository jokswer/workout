import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async getUserByTelegramId(id: number) {
    return await this.userRepository.findOneBy({
      tgUserId: id,
    });
  }

  public async createUser(userData: any) {
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
