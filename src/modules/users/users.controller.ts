import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags, ApiResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'List all the users' })
  @ApiResponse({ status: 200, description: 'Retrieve all users' })
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Get a user searching by ID' })
  @ApiResponse({ status: 200, description: 'User found' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getUserById(@Param('userId') userId: number) {
    return this.usersService.getUserById(userId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a specific user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'UserCreated' })
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Put(':userId')
  @ApiOperation({ summary: 'Update a specific user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 200, description: 'User successfully updated' })
  async updateUser(@Body() updatedUser: Partial<CreateUserDto>, @Param('userId') userId: number) {
    return this.usersService.updateUser(userId, updatedUser);
  }

  @Delete(':userId')
  @ApiOperation({ summary: 'Delete a given user' })
  @ApiResponse({ status: 201, description: 'User successfully deleted' })
  async deleteUser(@Param('userId') userId: number) {
    return this.usersService.deleteUser(userId);
  }
}
