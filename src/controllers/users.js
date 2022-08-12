import HttpStatus from 'http-status-codes';
import { transaction } from 'objection';

import Serializer from './../serializers/Serializer.js';
import User from './../models/User.js';
import whitelist from '../utils/whitelist.js';

const usersWhitelist = [
  'firstName',
  'lastName',
  'email',
];

export const list = async (ctx) => {
  const users = await User.query().select();

  ctx.body = users;
}

export const get = async (ctx) => {
  const user = await User.query().findById(ctx.params.id);

  if (!user) {
    ctx.status = HttpStatus.NOT_FOUND;
    return;
  }

  ctx.body = element.toJSON();
};


export const create = async (ctx) => {
  const data = await Serializer.deserialize('user', ctx.request.body);
  const { body: payload } = whitelist(data, {
    whitelist: usersWhitelist,
  });

  // await validator(payload);
  const user = await User.query().findOne({ email: payload.email });
  if (user) {
    ctx.status = HttpStatus.CONFLICT;
  } else {
    const created = await User.query().insert(payload)
    ctx.body = created;
    ctx.status = HttpStatus.CREATED;
  }
}

export const update = async (ctx) => {
  const data = await Serializer.deserialize('user', ctx.request.body);
  const { body: payload } = whitelist(data, {
    whitelist: usersWhitelist,
  });

  const user = await User.query().findById(ctx.params.id);

  if (!user) {
    ctx.status = HttpStatus.NOT_FOUND;
    return;
  }

  const updatedUser = await transaction(User.knex(), async (trx) => {
    const record = await user
      .$query(trx)
      .patch({ ...payload })
      .returning('*');
    return record;
  });

  ctx.body = updatedUser.toJSON();
  ctx.status = HttpStatus.OK;
}

export const remove = async (ctx) => {
  await User.query().where('id', ctx.params.id)
    .del();

  ctx.body = {};
  ctx.status = HttpStatus.OK;
}