import { Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { UsersRepository } from '@/modules/users/users.repository';
import { CreateUserDto } from '@/modules/users/dto/create-user.dto';

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

  async updateUser(id: number, updatedUser: Partial<CreateUserDto>): Promise<boolean> {
    this.logger.debug('Entering UsersService.updateUser');
    const existingUser = (await this.usersRepository.findById(id)) as CreateUserDto;

    return this.usersRepository.updateOne(id, {
      ...existingUser,
      ...updatedUser,
    });
  }

  async deleteUser(id: number): Promise<boolean> {
    return this.usersRepository.deleteOne(id);
  }
}
