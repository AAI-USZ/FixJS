function() {
  var extend, ljust, repeat, rjust,
    __slice = [].slice;

  repeat = function(n, s) {
    if (s == null) {
      s = " ";
    }
    return Array(n + 1).join(s);
  };

  ljust = function(s, n) {
    return repeat(n - s.length) + s;
  };

  rjust = function(s, n) {
    return s + repeat(n - s.length);
  };

  extend = function() {
    var c, k, obj, objs, v, _i, _len;
    c = arguments[0], objs = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    for (_i = 0, _len = objs.length; _i < _len; _i++) {
      obj = objs[_i];
      for (k in obj) {
        v = obj[k];
        c[k] = v;
      }
    }
    return c;
  };

  module.exports = {
    ljust: ljust,
    rjust: rjust,
    extend: extend
  };

}