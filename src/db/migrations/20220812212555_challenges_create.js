export const up = async (knex) =>
  knex.schema.createTable('challenges', (table) => {
    table
      .uuid('id')
      .primary()
      .notNullable()
      .unique()
      .defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('name').notNullable();
    table.string('description');
    table.date('start_date').notNullable();
    table.date('end_date').notNullable();
    table.string('email_restriction');
    table.specificType('user_ids', 'UUID ARRAY');
    table.string('created_by');
    table.string('updated_by');
    table.timestamps(true, true);
  });

export const down = (knex) => knex.schema.dropTable('challenges');