import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from 'src/modules/user/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getAllUsers(): Promise<CreateUserDto[]> {
    return this.usersRepository.findAll(['id', 'first_name', 'last_name', 'email']);
  }

  async getUserById(id: number): Promise<CreateUserDto | undefined> {
    return this.usersRepository.findById(id);
  }

  async createUser(userToCreate: CreateUserDto): Promise<CreateUserDto | undefined> {
    return this.usersRepository.insertOne(userToCreate, [
      'id',
      'first_name',
      'last_name',
      'email',
    ]);
  }

  async updateUser(id: number, updatedUser: CreateUserDto): Promise<boolean> {
    return this.usersRepository.updateOne(id, updatedUser)
  }

  async deleteUser(id: number): Promise<boolean> {
    return this.usersRepository.deleteOne(id);
  }
}

