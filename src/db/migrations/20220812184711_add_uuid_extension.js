export const up = async (knex) =>
  await knex.raw('create extension if not exists "uuid-ossp"');

export const down = async (knex) => await knex.raw('drop extension if exists "uuid-ossp"');