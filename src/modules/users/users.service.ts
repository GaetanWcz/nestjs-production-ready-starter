import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from 'src/modules/users/users.repository';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class UsersService {
  constructor(
    @InjectPinoLogger(UsersService.name) private readonly logger: PinoLogger,
    private readonly usersRepository: UsersRepository,
  ) {}

  async getAllUsers(): Promise<CreateUserDto[]> {
    this.logger.debug('Entering UsersService.getAllUsers()');
    return this.usersRepository.findAll(['id', 'first_name', 'last_name', 'email']);
  }

  async getUserById(userId: number): Promise<CreateUserDto | undefined> {
    this.logger.debug(`Entering UsersService.getUserById(${userId})`);
    return this.usersRepository.findById(userId);
  }

  async createUser(userToCreate: CreateUserDto): Promise<CreateUserDto | undefined> {
    return this.usersRepository.insertOne(userToCreate, ['id', 'first_name', 'last_name', 'email']);
  }

  async updateUser(id: number, updatedUser: CreateUserDto): Promise<boolean> {
    return this.usersRepository.updateOne(id, updatedUser);
  }

  async deleteUser(id: number): Promise<boolean> {
    return this.usersRepository.deleteOne(id);
  }
}
