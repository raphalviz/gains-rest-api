import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

let users: User[] = [];

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  getAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  getByUsername(username: string): User {
    return users.filter(user => user.username === username)[0];
  }

  async addUser(newUser: CreateUserDto) {
    newUser.password = await this.hashPassword(newUser.password);
    let createdUser = new this.userModel(newUser);
    try {
      return await createdUser.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new HttpException('User already exists', 200);
      }
    }
  }

  async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }
}
