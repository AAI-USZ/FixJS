function extendCtx(ctx, value, name, alias, index, isArray, macro) {
  var path = ctxPath(ctx, name, macro, true)
    , aliases;
  ctx = extend(ctx, value);
  ctx['this'] = value;
  if (alias) {
    aliases = ctx.$aliases = Object.create(ctx.$aliases);
    aliases[alias] = ctx.$paths.length;
  }
  if (path) {
    ctx.$paths = [[path, ctx.$indices.length]].concat(ctx.$paths);
  }
  if (index != null) {
    ctx.$indices = [index].concat(ctx.$indices);
    ctx.$index = index;
    isArray = true;
  }
  if (isArray && ctx.$paths[0][0]) {
    ctx.$paths[0][0] += '.$#';
  }
  return ctx;
}