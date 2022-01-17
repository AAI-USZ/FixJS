function (value) {
    ctx.seen = [];
    return formatValue(ctx, value, ctx.maxDepth);
  }