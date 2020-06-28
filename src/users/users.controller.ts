import {
  Controller,
  Get,
  HttpCode,
  Post,
  Body,
  UseGuards,
  Req,
  Res,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GoogleAuthGuard } from '../auth/google-auth.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request, Response } from 'express';
import { ApiResponse } from '@nestjs/swagger';
import { User } from './classes/user.class';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'User found',
    type: User,
  })
  async getUserById(@Req() req, @Res() res, @Param() params) {
    if (params.id === req.user.id) {
      const user = await this.userService.findUserById(params.id);
      return res.json(user);
    } else {
      return res.status(401).send('Unauthorized');
    }
  }
}
