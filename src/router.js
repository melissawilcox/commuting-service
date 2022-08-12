import Router from 'koa-router';

const router = new Router();

import * as Challenges from './controllers/challenges.js';
import * as CommuteTypes from './controllers/commuteTypes.js';
import * as Logs from './controllers/logs.js';
import * as Users from './controllers/users.js';

router
  .get('/', (ctx) => {
    ctx.body = 'Commuting Service';
  })

  .get('challenges', '/challenges', Challenges.list)
  .get('challenges', '/challenges/:id', Challenges.get)
  .post('challenges', '/challenges', Challenges.create)
  .patch('challenges', '/challenges/:id', Challenges.update)
  .delete('challenges', '/challenges/:id', Challenges.remove)

  .get('commute-types', '/commute-types', CommuteTypes.list)
  .get('commute-types', '/commute-types/:id', CommuteTypes.get)
  .post('commute-types', '/commute-types', CommuteTypes.create)
  .patch('commute-types', '/commute-types/:id', CommuteTypes.update)
  .delete('commute-types', '/commute-types/:id', CommuteTypes.remove)

  .get('logs', '/logs', Logs.list)
  .get('logs', '/logs/:id', Logs.get)
  .post('logs', '/logs', Logs.create)
  .patch('logs', '/logs/:id', Logs.update)
  .delete('logs', '/logs/:id', Logs.remove)

  .get('users', '/users', Users.list)
  .get('users', '/users/:id', Users.get)
  .post('users', '/users', Users.create)
  .patch('users', '/users/:id', Users.update)
  .delete('users', '/users/:id', Users.remove)

export default router;