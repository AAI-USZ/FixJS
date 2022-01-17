function (ctx) {
  // set id one wasnt provided in the query
  ctx.query.id = ctx.query.id || this.parseId(ctx) || (ctx.body && ctx.body.id);

  if (ctx.req.internal) {
    ctx.session.internal = true;
  }

  switch(ctx.req.method) {
    case 'GET':
      this.find(ctx.session, ctx.query, ctx.dpd, ctx.done);
    break;
    case 'PUT':
      if (!ctx.query.id) {
        ctx.done("must provide id to update an object");
        break;
      } 
    case 'POST':
      this.save(ctx.session, ctx.body, ctx.query, ctx.dpd, ctx.done);
    break;
    case 'DELETE':
      this.remove(ctx.session, ctx.query, ctx.dpd, ctx.done);
    break;
  }
}