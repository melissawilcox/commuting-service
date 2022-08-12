import Router from 'koa-router';

const router = new Router();

import * as Users from './controllers/users.js';

router
  .get('/', (ctx) => {
    ctx.body = 'Commuting Service';
  })
  .get('users', '/users', Users.list)

export default router;