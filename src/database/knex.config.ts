import { Knex } from 'knex';

export const knexConfig: Knex.Config = {
  client: 'pg', 
  connection: {
    host: process.env.DB_HOST ?? 'localhost',
    user: process.env.DB_USER ?? 'user',
    password: process.env.DB_PASSWORD ?? 'password',
    database: process.env.DB_NAME ?? 'my_database',
  },
  pool: {
    min: 2,
    max: 10,
  },
};
