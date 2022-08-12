import { checkHeartbeat, HEARTBEAT_QUERIES } from 'knex-utils';
const HEARTBEAT_QUERY = HEARTBEAT_QUERIES.POSTGRESQL;
import knex from './knex.js';

export default () => checkHeartbeat(knex, HEARTBEAT_QUERY);
