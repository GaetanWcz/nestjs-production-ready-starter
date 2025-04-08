import { Knex } from 'knex';
import { snakeCase, camelCase } from 'lodash';

function toSnakeCase(obj: Record<string, any>) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [snakeCase(key), value])
  );
}

function toCamelCase(obj: Record<string, any>) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [camelCase(key), value])
  );
}

export class BaseRepository {
  constructor(protected readonly knex: Knex, protected readonly tableName: string) {}

  async insertOne<T = any>(data: Record<string, any>, returning: string[] = ['*']): Promise<T> {
    const [result] = await this.knex(this.tableName)
      .insert(toSnakeCase(data))
      .returning(returning);

    return toCamelCase(result) as T;
  }

  async findById<T = any>(id: number): Promise<T | undefined> {
    const result = await this.knex(this.tableName)
      .where({ id })
      .first();

    return result ? toCamelCase(result) as T : undefined;
  }

  async findAll<T = any>(columns: string[] = ['*']): Promise<T[]> {
    const rows = await this.knex(this.tableName).select(columns);
    return rows.map(row => toCamelCase(row)) as T[];
  }

  async deleteOne(id: number): Promise<boolean> {
    const count = await this.knex(this.tableName)
      .where({ id })
      .del();

    return count > 0;
  }

  async updateOne(id: number, data: Record<string, any>): Promise<boolean> {
    const updatedRowCount = await this.knex(this.tableName)
      .where({ id })
      .update(toSnakeCase(data));

    return updatedRowCount > 0;
  }
}
