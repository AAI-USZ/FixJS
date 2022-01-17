function formatValue(ctx, value, recurseTimes) {
  var typeof_value = getTypeOf(value);
  
  // Handle primitive types
  switch (typeof_value) {
    case 'null':      return ctx.stylize('null', 'null');
    case 'undefined': return ctx.stylize('undefined', 'undefined');
    case 'string':    return ctx.stylize(ctx.quoteString(value), 'string');
    case 'number':    return ctx.stylize('' + value, 'number');
    case 'boolean':   return ctx.stylize('' + value, 'boolean');
  }

  switch (typeof_value) {
    case 'date':      return ctx.stylize(ctx.formatDate(ctx, value, recurseTimes), 'date');
    case 'error':     return ctx.stylize(ctx.formatError(ctx, value, recurseTimes), 'error');
    case 'regexp':    return ctx.stylize(ctx.formatRegExp(ctx, value, recurseTimes), 'regexp');
    case 'function':  return ctx.stylize(ctx.formatFunction(ctx, value, recurseTimes), 'special');
  }

  if (recurseTimes === 0) {
    return ctx.stylize('[...]', 'special');
  }

  switch (typeof_value) {
    case 'object':    return formatObject(ctx, value, recurseTimes);
    case 'array':     return formatArray(ctx, value, recurseTimes);
  }
}