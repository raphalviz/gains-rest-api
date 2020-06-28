import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';

class MockUsersService extends UsersService  {
  
}

class MockUsersModel {

}

describe('Users Controller', () => {
  let usersService: UsersService;
  let usersController: UsersController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getModelToken('User'),
          useValue: new MockUsersModel()
        }
      ],
    }).compile();

  usersService = moduleRef.get<UsersService>(UsersService);
  usersController = moduleRef.get<UsersController>(UsersController);
  });

  it('should be defined', async () => {
    expect(usersController).toBeDefined(); 
  });
});
