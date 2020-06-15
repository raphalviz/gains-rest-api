import { Controller, Get, Query, HttpCode, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) { }

  @Get()
  getUser(@Query() query) {
    if (query.username) {
      return this.userService.getByUsername(query.username) || this.userNotFound();
    }
    return this.userService.getAll();
  }

  @Post()
  async addUser(@Body() newUser: CreateUserDto) {
    return await this.userService.addUser(newUser);
  }

  @HttpCode(404)
  userNotFound() {
    return "User not found";
  }
}
