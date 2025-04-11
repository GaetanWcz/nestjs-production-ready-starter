import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HealthCheckResult, HealthCheckService } from '@nestjs/terminus';
import knex, { Knex as KnexType } from 'knex';

@Injectable()
export class HealthService {
  private readonly knex: KnexType;

  constructor(
    private readonly health: HealthCheckService,
    private readonly configService: ConfigService,
  ) {
    this.knex = knex({
      client: 'pg',
      connection: {
        host: this.configService.get<string>('DB_HOST'),
        user: this.configService.get<string>('DB_USER'),
        password: this.configService.get<string>('DB_PASSWORD'),
        database: this.configService.get<string>('DB_NAME'),
        port: this.configService.get<number>('DB_PORT'),
      },
    });
  }

  async readinessCheck(): Promise<HealthCheckResult> {
    try {
      return await this.health.check([async () => this.checkDatabase()]);
    } catch (err) {
      return {
        status: 'error',
        error: err.message,
        details: err.stack,
      };
    }
  }

  async livenessCheck(): Promise<any> {
    return this.health.check([
      // add whatever you want to monitor for keeping your app alive
    ]);
  }

  private async checkDatabase(): Promise<any> {
    try {
      await this.knex.raw('SELECT 1');
      return { status: 'up' };
    } catch (error) {
      throw new Error('Database is down');
    }
  }
}
