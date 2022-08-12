/*
The bigint data is returned as a string in queries because JavaScript may 
be unable to parse them without loss of precision. So we have added the parser 
before knex to parse the string into Int.

Date types from pg are being returned with timestamp included
even when they are stored without it. So we have added the parser 
before knex to parse the date types to return dates without timestamp.
*/
import pg from 'pg';
import Knex from 'knex';
import knexConfig from '../../knexfile.js';
import config from '../config/index.js';

const DATE_OID = 1082;
const parseDate = (value) => value;

pg.types.setTypeParser(DATE_OID, parseDate);

pg.types.setTypeParser(20, 'text', parseInt);

export default Knex({
  ...knexConfig[config.env],
});
