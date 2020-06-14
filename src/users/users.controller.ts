import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getUser(@Query() query) {
    if (query.username) {
      return this.userService.getByUsername(query.username);
    }
    return this.userService.getAll();
  }

  @Get('add')
  addUser() {
    this.userService.addUser();
  }
}
