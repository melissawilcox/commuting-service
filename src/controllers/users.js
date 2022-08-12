import HttpStatus from 'http-status-codes';

export const list = (ctx) => {
  ctx.status = HttpStatus.OK;
  ctx.body = [{ id: 1, firstName: 'user' }];
}