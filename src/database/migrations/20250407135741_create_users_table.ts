import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary(); // ID de l'utilisateur
    table.string('first_name').notNullable(); // Prénom
    table.string('last_name').notNullable(); // Nom de famille
    table.string('email').notNullable().unique(); // Email unique
    table.string('password').notNullable(); // Mot de passe
    table.timestamps(true, true); // Colonnes created_at et updated_at
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('users');
}
