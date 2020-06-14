import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';

let users: User[] = [];

@Injectable()
export class UsersService {
  getAll(): any {
    return users;
  }

  getByUsername(username: string): User {
    return users.filter(user => user.username === username)[0];
  }

  addUser() {
    const newUser: User = {
      username: "bob",
      password: "password123",
      firstName: "Bob"
    }
    users.push(newUser);
  }
}
