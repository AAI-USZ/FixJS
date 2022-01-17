function patchCtx(ctx, triggerPath) {
  var path = ctx.$paths[0];
  if (!(triggerPath && path)) return;

  var segments = path.split('.')
    , triggerSegments = triggerPath.replace(/\*$/, '').split('.')
    , indices = ctx.$indices.slice()
    , index = indices.length
    , i, len, segment, triggerSegment, n;
  for (i = 0, len = segments.length; i < len; i++) {
    segment = segments[i];
    triggerSegment = triggerSegments[i];
    // `(n = +triggerSegment) === n` will be false only if segment is NaN
    if (segment === '$#' && (n = +triggerSegment) === n) {
      indices[--index] = n;
    } else if (segment !== triggerSegment) {
      break;
    }
  }
  ctx.$indices = indices;
  ctx.$index = indices[0];
}