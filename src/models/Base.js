import { Model, mixin } from 'objection';

import knex from './../db/knex.js';

Model.knex(knex);

export default class Base extends mixin(Model) {
  static get modelPaths() {
    return [__dirname];
  }
}
