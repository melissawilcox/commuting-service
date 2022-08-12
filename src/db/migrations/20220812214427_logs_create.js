export const up = async (knex) =>
  knex.schema.createTable('logs', (table) => {
    table
      .uuid('id')
      .primary()
      .notNullable()
      .unique()
      .defaultTo(knex.raw('uuid_generate_v4()'));
    table
      .uuid('commute_type_id')
      .notNullable();
    table
      .uuid('user_id')
      .notNullable();
    table.integer('mileage').notNullable();
    table.date('date').notNullable();
  });

export const down = (knex) => knex.schema.dropTable('logs');