import Router from 'koa-router';

const router = new Router();

import * as Users from './controllers/users.js';

router
  .get('/', (ctx) => {
    ctx.body = 'Commuting Service';
  })
  .get('users', '/users', Users.list)
  .get('users', '/users/:id', Users.get)
  .post('users', '/users', Users.create)
  .patch('users', '/users/:id', Users.update)
  .delete('users', '/users/:id', Users.remove);

export default router;