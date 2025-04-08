import { Injectable, OnModuleDestroy } from '@nestjs/common';
import knex, { Knex as KnexType } from 'knex';
import knexConfig from './knex.config'

@Injectable()
export class KnexService implements OnModuleDestroy {
  private readonly knex: KnexType;

  constructor() {
    this.knex = knex(knexConfig);
  }

  getKnexInstance(): KnexType {
    return this.knex;
  }

  onModuleDestroy() {
    this.knex.destroy();
  }
}
