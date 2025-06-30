import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty()
  accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }
}

export const authMapper = (accessToken: string) => new AuthDto(accessToken);
