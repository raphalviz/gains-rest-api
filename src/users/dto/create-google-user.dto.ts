import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty } from 'class-validator';

export class CreateGoogleUserDto extends CreateUserDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  method: 'google';
}
