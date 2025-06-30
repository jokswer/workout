import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class UserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  languageCode?: string;

  @ApiProperty()
  photoUrl?: string;

  constructor(data: User) {
    this.id = data.id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.username = data.username;
    this.languageCode = data.languageCode;
    this.photoUrl = data.photoUrl;
  }
}

export const userMapper = (data: User) => new UserDto(data);
