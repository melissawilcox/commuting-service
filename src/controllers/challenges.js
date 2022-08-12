import HttpStatus from 'http-status-codes';
import { transaction } from 'objection';

import Serializer from './../serializers/Serializer.js';
import Challenge from './../models/Challenge.js';
import whitelist from '../utils/whitelist.js';

const challengesWhitelist = [
  'name',
  'description',
  'startDate',
  'endDate',
  'emailRestriction',
  'userIds'
];

export const list = async (ctx) => {
  const challenges = await Challenge.query().select();

  ctx.body = challenges;
}

export const get = async (ctx) => {
  const challenge = await Challenge.query().findById(ctx.params.id);

  if (!challenge) {
    ctx.status = HttpStatus.NOT_FOUND;
    return;
  }

  ctx.body = challenges.toJSON();
};


export const create = async (ctx) => {
  const data = await Serializer.deserialize('challenge', ctx.request.body);
  const { body: payload } = whitelist(data, {
    whitelist: challengesWhitelist,
  });

  // await validator(payload);
  const created = await Challenge.query().insert(payload)
  ctx.body = created;
  ctx.status = HttpStatus.CREATED;
}

export const update = async (ctx) => {
  const data = await Serializer.deserialize('challenge', ctx.request.body);
  const { body: payload } = whitelist(data, {
    whitelist: challengesWhitelist,
  });

  const challenge = await Challenge.query().findById(ctx.params.id);

  if (!challenge) {
    ctx.status = HttpStatus.NOT_FOUND;
    return;
  }

  const updatedChallenge = await transaction(Challenge.knex(), async (trx) => {
    const record = await updatedChallenge
      .$query(trx)
      .patch({ ...payload })
      .returning('*');
    return record;
  });

  ctx.body = updatedChallenge.toJSON();
  ctx.status = HttpStatus.OK;
}

export const remove = async (ctx) => {
  await Challenge.query().where('id', ctx.params.id)
    .del();

  ctx.body = {};
  ctx.status = HttpStatus.OK;
}