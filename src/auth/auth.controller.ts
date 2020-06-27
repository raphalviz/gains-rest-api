import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { GoogleAuthGuard } from './google-auth.guard';
import { response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Req() req) {}

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  googleAuthRedirect(@Req() req, @Res() res) {
    const data: any = this.authService.googleLogin(req);
    if (data.user) {
      const cookie = this.authService.getJwtCookie(data.user.email);
      res.setHeader('Set-Cookie', cookie);
      return res.send(data);
    }
  }
}
