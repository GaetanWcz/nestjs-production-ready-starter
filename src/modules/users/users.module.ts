import { KnexModule } from '@/database/knex.module';
import { UsersController } from '@/modules/users/users.controller';
import { UsersRepository } from '@/modules/users/users.repository';
import { UsersService } from '@/modules/users/users.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [KnexModule],
  providers: [UsersService, UsersRepository],
  controllers: [UsersController],
})
export class UsersModule {}
