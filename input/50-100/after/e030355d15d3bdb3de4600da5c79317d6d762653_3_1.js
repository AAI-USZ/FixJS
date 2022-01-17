function(p1, p2, ignoreLast) {
    var i, p, _i, _len;
    if (p1.length !== p2.length) {
      return false;
    }
    for (i = _i = 0, _len = p1.length; _i < _len; i = ++_i) {
      p = p1[i];
      if (p !== p2[i] && (!ignoreLast || i !== p1.length - 1)) {
        return false;
      }
    }
    return true;
  }