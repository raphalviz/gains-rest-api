import {
  Controller,
  Get,
  Query,
  HttpCode,
  Post,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { GoogleAuthGuard } from '../auth/google-auth.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getUser(@Req() req, @Query() query) {
    if (query.username) {
      return (
        this.userService.getByUsername(query.username) || this.userNotFound()
      );
    }
    console.log(req);
    return this.userService.getAll();
  }

  @Post()
  async addUser(@Body() newUser: CreateUserDto) {
    return await this.userService.addUser(newUser);
  }

  @HttpCode(404)
  userNotFound() {
    return 'User not found';
  }
}
