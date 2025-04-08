import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'First name',
    example: 'John',
  })
  firstName: string;

  @ApiProperty({
    description: 'Last name',
    example: 'Doe',
  })
  lastName: string;

  @ApiProperty({
    description: "User's password - for test only obviously",
    example: 'My4w3sOmEp4s5w0rD',
  })
  password: string;

  @ApiProperty({
    description: 'Email',
    example: 'johndoe@example.com',
  })
  email: string;
}
