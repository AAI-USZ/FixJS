function(index, _arg) {
  var a, bX, bY, digits, h, maxnum, n, newindex, number, sX, sY, w, _i, _len, _ref;
  w = _arg[0], h = _arg[1];
  maxnum = Math.max(w, h, index[index.length - 1].f);
  digits = Math.ceil(Math.log(maxnum) / Math.log(36));
  newindex = [];
  for (_i = 0, _len = index.length; _i < _len; _i++) {
    _ref = index[_i], f = _ref.f, sX = _ref.sX, sY = _ref.sY, bX = _ref.bX, bY = _ref.bY, w = _ref.w, h = _ref.h;
    newindex = newindex.concat([f, sX, sY, bX, bY, w, h]);
  }
  a = (function() {
    var _j, _len1, _results;
    _results = [];
    for (_j = 0, _len1 = newindex.length; _j < _len1; _j++) {
      number = newindex[_j];
      n = number.toString(36);
      while (n.length < digits) {
        n = '0' + n;
      }
      _results.push(n);
    }
    return _results;
  })();
  return a.join('');
}