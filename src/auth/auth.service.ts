import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  /**
   * Login handler for Google OAuth 2.0
   * Returns user object from database.  If no record exists for this
   * email address, a new user record will be created and returned.
   *
   * @param req
   * @return JSON of the found/created user
   */
  async googleLogin(req) {
    if (!req.user) return 'No user from google';

    const user = await this.userService.findUserByEmail(req.user.email);
    if (user) return user;

    return this.userService.createUserFromGoogle({
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      method: 'google',
    });
  }

  /**
   * Create payload for JWT and sign it.
   *
   * @param user JSON of user containing email and ObjectId
   * @return Key=value string to sent in the Set-Cookie header
   */
  getJwtCookie(user): String {
    const id = user._id.toString();
    const payload = { email: user.email, id };
    const token = this.jwtService.sign(payload);
    const secure = process.env.STAGE === 'prod' ? 'Secure;' : '';
    return `Authentication=${token}; HttpOnly; ${secure} Path=/; Max-Age=86400`;
  }
}
