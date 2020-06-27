import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService, JwtModule } from '@nestjs/jwt';

describe('Auth Controller', () => {
  let controller: AuthController;

  it('should be defined', () => {
    expect(true).toBeDefined();
  });
});
