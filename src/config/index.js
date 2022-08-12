import dotenv from 'dotenv';
dotenv.config();

const appName = process.env.APP_NAME || 'commuting-service';

const env = process.env.NODE_ENV || 'development';

export default {
  appName,
  env,
  port: process.env.APP_PORT || 3000,
  prefix: '/api/v1',
};
