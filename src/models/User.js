import Base from './Base.js';

export default class User extends Base {
  static get tableName() {
    return 'users';
  }
}
