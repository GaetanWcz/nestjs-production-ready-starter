import { BaseRepository } from '@/common/base.repository';
import { KnexService } from '@/database/knex.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository extends BaseRepository {
  constructor(knexService: KnexService) {
    super(knexService.getKnexInstance(), 'users');
  }
}
