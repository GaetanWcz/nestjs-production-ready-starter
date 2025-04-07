import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags, ApiResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'List all the users' })
  @ApiResponse({ status: 200, description: 'Récupère tous les utilisateurs.' })
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user searching by ID' })
  @ApiResponse({ status: 200, description: 'Récupère un utilisateur par ID.' })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé.' })
  async getUserById(@Param('id') id: number) {
    return this.usersService.getUserById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a specific user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'Utilisateur créé.' })
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }
}
