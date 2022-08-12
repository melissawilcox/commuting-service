import HttpStatus from 'http-status-codes';
import { transaction } from 'objection';

import Serializer from './../serializers/Serializer.js';
import CommuteType from './../models/CommuteType.js';
import whitelist from '../utils/whitelist.js';

const commuteTypesWhitelist = [
  'name',
  'icon',
];

export const list = async (ctx) => {
  const commuteTypes = await CommuteType.query().select();

  ctx.body = commuteTypes;
}

export const get = async (ctx) => {
  const commuteType = await CommuteType.query().findById(ctx.params.id);

  if (!commuteType) {
    ctx.status = HttpStatus.NOT_FOUND;
    return;
  }

  ctx.body = commuteType.toJSON();
};


export const create = async (ctx) => {
  const data = await Serializer.deserialize('commuteType', ctx.request.body);
  const { body: payload } = whitelist(data, {
    whitelist: commuteTypesWhitelist,
  });

  // await validator(payload);
  const created = await CommuteType.query().insert(payload)
  ctx.body = created;
  ctx.status = HttpStatus.CREATED;
}

export const update = async (ctx) => {
  const data = await Serializer.deserialize('commuteType', ctx.request.body);
  const { body: payload } = whitelist(data, {
    whitelist: commuteTypesWhitelist,
  });

  const commuteType = await CommuteType.query().findById(ctx.params.id);

  if (!commuteType) {
    ctx.status = HttpStatus.NOT_FOUND;
    return;
  }

  const updatedCommuteType = await transaction(CommuteType.knex(), async (trx) => {
    const record = await updatedCommuteType
      .$query(trx)
      .patch({ ...payload })
      .returning('*');
    return record;
  });

  ctx.body = updatedCommuteType.toJSON();
  ctx.status = HttpStatus.OK;
}

export const remove = async (ctx) => {
  await CommuteType.query().where('id', ctx.params.id)
    .del();

  ctx.body = {};
  ctx.status = HttpStatus.OK;
}