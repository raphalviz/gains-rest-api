import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';

class MockUsersModel {
  private users = [1, 2, 3];

  constructor(private user?) { }

  find() {
    return {
      users: this.users,
      exec: function () {
        return this.users;
      }
    }
  }

  save() {
    this.users.push(this.user);
  }
}

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken('User'),
          useValue: new MockUsersModel()
        }
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return users', () => {
    expect(service.getAll()).toEqual([1, 2, 3]);
  });
});
