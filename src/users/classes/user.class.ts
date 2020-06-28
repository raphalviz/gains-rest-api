import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({
    example: '5ef7c81411dc14816834f587',
    description: 'Unique ObjectId of the User',
  })
  _id: string;

  @ApiProperty({
    example: 'example@email.com',
    description: 'Email address of the user',
  })
  email: string;

  @ApiProperty({
    example: 'John',
    description: 'First name of the user',
  })
  firstName: string;

  @ApiProperty({
    example: 'Smith',
    description: 'Last name of the user',
  })
  lastName: string;

  @ApiProperty({
    example: 'google',
    description: 'Authentication method of the user',
  })
  method: string;

  @ApiProperty({
    example: '2020-06-27T23:40:01.970Z',
    description: 'Creation date of user account',
  })
  createdAt: string;

  @ApiProperty({
    example: '2020-06-27T23:40:01.970Z',
    description: 'Last update of user account',
  })
  updatedAt: string;

  @ApiProperty()
  __v: number;
}
