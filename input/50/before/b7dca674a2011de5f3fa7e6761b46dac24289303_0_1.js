function (value) {
    ctx.seen = [];
    return ctx.formatValue(ctx, value, ctx.maxDepth);
  }