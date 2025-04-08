import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { KnexModule } from '../../database/knex.module';
import { UsersRepository } from 'src/modules/user/users.repository';

@Module({
  imports: [KnexModule],
  providers: [UsersService, UsersRepository],
  controllers: [UsersController],
})
export class UsersModule {}
