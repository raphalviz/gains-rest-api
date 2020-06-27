import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { GoogleAuthGuard } from './auth/google-auth.guard';
import { response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  index() {
    return 'Hello World!';
  }
}
