import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateGoogleUserDto } from './dto/create-google-user.dto';

let users: User[] = [];

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  getAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  /**
   * Search database for user with matching ObjectId
   * @param id
   */
  async findUserById(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  /**
   * Search database for a user with email
   * @param email
   */
  async findUserByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }

  /**
   * Create a new user account for some who signed in using Google
   * @param newUser
   */
  async createUserFromGoogle(newUser: CreateGoogleUserDto) {
    const createdUser = new this.userModel(newUser);
    try {
      return await createdUser.save();
    } catch (error) {
      console.log(error);
    }
  }
}
