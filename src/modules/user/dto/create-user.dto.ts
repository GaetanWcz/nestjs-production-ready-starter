import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nom d\'utilisateur',
    example: 'johndoe',
  })
  username: string;

  @ApiProperty({
    description: 'Email de l\'utilisateur',
    example: 'johndoe@example.com',
  })
  email: string;
}
