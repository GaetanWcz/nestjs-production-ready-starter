import { Injectable } from '@nestjs/common';
import { KnexService } from '../../database/knex.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly knexService: KnexService) {}

  async getAllUsers() {
    const knex = this.knexService.getKnexInstance();
    return knex('users').select('id', 'username', 'email');
  }

  async getUserById(id: number) {
    const knex = this.knexService.getKnexInstance();
    return knex('users').where('id', id).first();
  }

  async createUser(createUserDto: CreateUserDto) {
    const knex = this.knexService.getKnexInstance();

    const [newUser] = await knex('users').insert(createUserDto, ['id', 'username', 'email']);
    return newUser;  // Retourne l'utilisateur créé avec son ID
  }
}