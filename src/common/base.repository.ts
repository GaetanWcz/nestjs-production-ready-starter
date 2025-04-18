import { Knex } from 'knex';
import { snakeCase, camelCase } from 'lodash';

function toSnakeCase(obj: Record<string, unknown>) {
  return Object.fromEntries(Object.entries(obj).map(([key, value]) => [snakeCase(key), value]));
}

function toCamelCase(obj: Record<string, unknown>) {
  return Object.fromEntries(Object.entries(obj).map(([key, value]) => [camelCase(key), value]));
}

export class BaseRepository {
  constructor(
    protected readonly knex: Knex,
    protected readonly tableName: string,
  ) {}

  async insertOne<T = unknown>(data: unknown, returning: string[] = ['*']): Promise<T> {
    const [result] = await this.knex(this.tableName)
      .insert(toSnakeCase(data as Record<string, unknown>))
      .returning(returning);

    return toCamelCase(result) as T;
  }

  async findById<T = unknown>(id: number): Promise<T | undefined> {
    const result = await this.knex(this.tableName).where({ id }).first();

    return result ? (toCamelCase(result) as T) : undefined;
  }

  async findAll<T = unknown>(columns: string[] = ['*']): Promise<T[]> {
    const rows = await this.knex(this.tableName).select(columns);
    return rows.map((row) => toCamelCase(row)) as T[];
  }

  async deleteOne(id: number): Promise<boolean> {
    const count = await this.knex(this.tableName).where({ id }).del();

    return count > 0;
  }

  async updateOne(id: number, data: Record<string, unknown>): Promise<boolean> {
    const updatedRowCount = await this.knex(this.tableName).where({ id }).update(toSnakeCase(data));

    return updatedRowCount > 0;
  }
}
