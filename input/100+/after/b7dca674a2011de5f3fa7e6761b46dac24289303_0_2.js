function Formatter (config) {
  var ctx = {};

  // Booleans
  ctx.showHidden           = config.showHidden;
  ctx.showAccessors        = config.showAccessors;
  ctx.quoteKeys            = config.quoteKeys;
  ctx.modelUndefinedAsNull = config.modelUndefinedAsNull;
  ctx.openBraceOnNewline   = config.openBraceOnNewline;
  ctx.jsonNullBehavior     = config.jsonNullBehavior;

  // Method Selection
  ctx.stylize         = (config.color) ? stylizeWithColor : stylizeNoColor;
  ctx.quoteString     = (config.quotes === "'") ? singleQuoteString : doubleQuoteString;
  ctx.formatDate      = dateFormats[config.format];
  ctx.formatError     = errorFormats[config.format];
  ctx.formatRegExp    = regexFormats[config.format];
  ctx.formatFunction  = functionFormats[config.format];

  // Other
  ctx.wrapWidth = config.wrapWidth;
  ctx.maxDepth  = config.maxDepth;
  ctx.space     = config.space;
  ctx.indent    = config.indent;
  ctx.cr        = config.cr;

  var formatter = function (value) {
    ctx.seen = [];
    return formatValue(ctx, value, ctx.maxDepth);
  };
  formatter.withConfig = withConfig;
  formatter.ctx = ctx;
  formatter.config = config;
  return formatter;
}