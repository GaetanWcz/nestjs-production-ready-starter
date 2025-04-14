import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'First name',
    example: 'John',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'Last name',
    example: 'Doe',
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    description: "User's password - for test only obviously",
    example: 'My4w3sOmEp4s5w0rD',
  })
  @IsString()
  password: string;

  @ApiProperty({
    description: 'Email',
    example: 'johndoe@example.com',
  })
  @IsEmail()
  email: string;
}
