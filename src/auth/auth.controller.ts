import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { GoogleAuthGuard } from './google-auth.guard';
import { response } from 'express';
import { ApiResponse } from '@nestjs/swagger';
import { User } from '../users/classes/user.class';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  @ApiResponse({
    status: 302,
    description: 'Redirect to Google sign-in form',
  })
  async googleAuth(@Req() req) {}

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Signed in with Google',
    type: User,
  })
  async googleAuthRedirect(@Req() req, @Res() res) {
    const user: any = await this.authService.googleLogin(req);
    if (user.email) {
      const cookie = this.authService.getJwtCookie(user);
      res.setHeader('Set-Cookie', cookie);
      return res.send(user);
    }
  }
}
