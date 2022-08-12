import config from './config/index.js';

import Koa from 'koa';
import koaBody from 'koa-body';

import router from './router.js';
import dbStatus from './db/dbStatus.js';
import status from './middleware/status.js'

const app = new Koa();

app.use(status(config, dbStatus));
app.use(koaBody());

router.prefix(config.prefix);
app.use(router.routes());
app.use(router.allowedMethods());

export default app;
