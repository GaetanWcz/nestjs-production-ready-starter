import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { KnexModule } from '../../database/knex.module';

@Module({
  imports: [KnexModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
