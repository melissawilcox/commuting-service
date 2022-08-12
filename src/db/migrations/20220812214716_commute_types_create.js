export const up = async (knex) =>
  knex.schema.createTable('commute_types', (table) => {
    table
      .uuid('id')
      .primary()
      .notNullable()
      .unique()
      .defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('name').notNullable();
    table.string('icon').notNullable();
  });

export const down = (knex) => knex.schema.dropTable('commute_types');