import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { UsersService } from './users.service';
import { UserDto } from './mappers/mapper';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get user profile' })
  @ApiOkResponse({ type: UserDto })
  @UseGuards(JwtAuthGuard)
  @Get('/me')
  public getProfile(@Req() req: Request) {
    return req.user;
  }
}
