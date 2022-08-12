import Router from 'koa-router';

export default ({ appName, logger }, dbStatus) => {
  const router = new Router();

  router.prefix('/status');

  router.get('/', async (ctx) => {
    const db = await dbStatus();
    if (!db.isOk) {
      logger.error(`Database ${db.error}`);
    }

    ctx.body = {
      name: appName,
      app: true,
      database: db.isOk,
    };
  });

  return router.routes();
};
