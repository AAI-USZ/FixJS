function(ctx, fn) {
  switch(ctx.req.method) {
    case 'DELETE':
      this.store.remove(fn);
    break;
  }
}