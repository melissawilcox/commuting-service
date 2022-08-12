export const up = async (knex) =>
  await knex.schema.createTable('users', (table) => {
    table
      .uuid('id')
      .primary()
      .notNullable()
      .unique()
      .defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('email').notNullable();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('created_by');
    table.string('updated_by');
    table.timestamps(true, true);
  });

export const down = (knex) => await knex.schema.dropTable('users');
