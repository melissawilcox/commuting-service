import Serializer from './../serializers/Serializer.js';

const mapping = {
  users: 'user',
};

export default async (ctx, next) => {
  await next();

  const resource = ctx._matchedRouteName;

  if (ctx.status >= 400 || !ctx.body || !resource) {
    return;
  }
  ctx.body = await Serializer.serialize(mapping[resource], ctx.body, ctx.state);
};
