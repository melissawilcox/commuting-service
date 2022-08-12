import dotenv from 'dotenv';
dotenv.config();

const appName = process.env.APP_NAME || 'commuting-service';

const env = process.env.NODE_ENV || 'development';

const isTest = env === 'test';

export default {
  appName,
  env,
  port: process.env.APP_PORT || 3000,
  prefix: '/api/v1',
  dbConnection: {
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    database: isTest
      ? process.env.TEST_DATABASE_NAME
      : process.env.DATABASE_NAME,
  },
  knexDebug: process.env.KNEX_DEBUG === 'true',
};
