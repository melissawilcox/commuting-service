// process.env.NODE_ENV !== 'production' && require('@babel/register');
import { knexSnakeCaseMappers } from 'objection';
import path from 'path';
import { fileURLToPath } from 'url';
import config from './src/config/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const defaultKnexConfig = (path) => ({
  client: 'postgresql',
  migrations: {
    tableName: 'knex_migrations',
    directory: `${__dirname}/${path}/db/migrations`,
    stub: `${__dirname}/${path}/db/migration.stub`,
  },
  seeds: {
    directory: `${__dirname}/${path}/db/seeds`,
  },
  pool: { min: 0, max: 10 },
  ...knexSnakeCaseMappers(),
});

export default {
  development: {
    ...defaultKnexConfig('src'),
    connection: config.dbConnection,
    debug: config.knexDebug,
  },
  test: {
    ...defaultKnexConfig('src'),
    connection: config.dbUri || config.dbConnection,
  },
  production: {
    ...defaultKnexConfig('dist'),
    connection: config.dbUri,
  },
};
