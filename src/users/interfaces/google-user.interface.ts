import { User } from '../schemas/user.schema';

export interface GoogleUser extends User {
  email: string;
  method: 'google';
}
