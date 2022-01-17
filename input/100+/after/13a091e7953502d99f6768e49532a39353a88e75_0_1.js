function(arr, cd) {
    var a, _i, _len, _results;
    if (cd == null) cd = false;
    _results = [];
    for (_i = 0, _len = arr.length; _i < _len; _i++) {
      a = arr[_i];
      if (Array.isArray(a)) {
        if (cd) {
          _results.push(cdwrite.apply(null, a));
        } else {
          _results.push(cwrite.apply(null, a));
        }
      } else {
        if (cd) {
          _results.push(cdwrite.apply(null, [a]));
        } else {
          _results.push(cwrite.apply(null, [a]));
        }
      }
    }
    return _results;
  }