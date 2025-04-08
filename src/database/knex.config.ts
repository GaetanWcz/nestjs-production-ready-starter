import { Knex } from 'knex';
import dotenv from 'dotenv';
dotenv.config();

const config: Knex.Config = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST ?? 'localhost',
    user: process.env.DB_USER ?? 'postgres',
    password: process.env.DB_PASSWORD ?? 'postgres',
    database: process.env.DB_NAME ?? 'nestjs_db',
    port: parseInt(process.env.DB_PORT ?? '5432'),
  },
  migrations: {
    schemaName: 'knex',
    tableName: 'migrations',
  },
  pool: {
    min: 2,
    max: 10,
  },
};

export default config;
