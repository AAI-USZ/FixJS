function(points) {
  var maxx, maxy, minx, miny, x, y, _i, _len, _ref;
  minx = Infinity;
  miny = Infinity;
  maxx = 0;
  maxy = 0;
  for (_i = 0, _len = points.length; _i < _len; _i++) {
    _ref = points[_i], x = _ref[0], y = _ref[1];
    minx = Math.min(minx, x);
    miny = Math.min(miny, y);
    maxx = Math.max(maxx, x);
    maxy = Math.max(maxy, y);
  }
  return [minx, miny, maxx, maxy];
}