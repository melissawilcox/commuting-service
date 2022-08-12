import HttpStatus from 'http-status-codes';
import { transaction } from 'objection';

import Serializer from './../serializers/Serializer.js';
import Log from './../models/Log.js';
import whitelist from '../utils/whitelist.js';

const logsWhitelist = [
  'commute_type_id',
  'user_id',
  'mileage',
  'date'
];

export const list = async (ctx) => {
  const logs = await Log.query().select();

  ctx.body = logs;
}

export const get = async (ctx) => {
  const log = await Log.query().findById(ctx.params.id);

  if (!log) {
    ctx.status = HttpStatus.NOT_FOUND;
    return;
  }

  ctx.body = log.toJSON();
};


export const create = async (ctx) => {
  const data = await Serializer.deserialize('log', ctx.request.body);
  const { body: payload } = whitelist(data, {
    whitelist: logsWhitelist,
  });

  // await validator(payload);
  const created = await Log.query().insert(payload)
  ctx.body = created;
  ctx.status = HttpStatus.CREATED;
}

export const update = async (ctx) => {
  const data = await Serializer.deserialize('log', ctx.request.body);
  const { body: payload } = whitelist(data, {
    whitelist: logsWhitelist,
  });

  const log = await Log.query().findById(ctx.params.id);

  if (!log) {
    ctx.status = HttpStatus.NOT_FOUND;
    return;
  }

  const updatedlog = await transaction(Log.knex(), async (trx) => {
    const record = await updatedlog
      .$query(trx)
      .patch({ ...payload })
      .returning('*');
    return record;
  });

  ctx.body = updatedLog.toJSON();
  ctx.status = HttpStatus.OK;
}

export const remove = async (ctx) => {
  await Log.query().where('id', ctx.params.id)
    .del();

  ctx.body = {};
  ctx.status = HttpStatus.OK;
}