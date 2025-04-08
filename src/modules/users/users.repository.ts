import { Injectable } from '@nestjs/common';
import { KnexService } from '../../database/knex.service';
import { BaseRepository } from '../../common/base.repository';

@Injectable()
export class UsersRepository extends BaseRepository {
  constructor(knexService: KnexService) {
    super(knexService.getKnexInstance(), 'users');
  }
}
