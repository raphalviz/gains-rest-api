import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }

    const payload = {
      email: req.user.email,
      firstName: req.user.firstName,
    };

    return {
      user: req.user,
    };
  }

  getJwtCookie(user: String): String {
    const payload = { user };
    const token = this.jwtService.sign(payload);
    const secure = process.env.STAGE === 'prod' ? 'Secure;' : '';
    return `Authentication=${token}; HttpOnly; ${secure} Path=/; Max-Age=86400`;
  }
}
