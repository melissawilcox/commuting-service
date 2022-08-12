import Router from 'koa-router';

const router = new Router();

import * as Users from './controllers/users.js';
import * as Challenges from './controllers/challenges.js';

router
  .get('/', (ctx) => {
    ctx.body = 'Commuting Service';
  })

  .get('users', '/users', Users.list)
  .get('users', '/users/:id', Users.get)
  .post('users', '/users', Users.create)
  .patch('users', '/users/:id', Users.update)
  .delete('users', '/users/:id', Users.remove)

  .get('challenges', '/challenges', Challenges.list)
  .get('challenges', '/challenges/:id', Challenges.get)
  .post('challenges', '/challenges', Challenges.create)
  .patch('challenges', '/challenges/:id', Challenges.update)
  .delete('challenges', '/challenges/:id', Challenges.remove);

export default router;