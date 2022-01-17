function(p1, p2) {
    var e, i, _i, _len;
    if (p1.length !== p2.length) {
      return false;
    }
    for (i = _i = 0, _len = p1.length; _i < _len; i = ++_i) {
      e = p1[i];
      if (e !== p2[i]) {
        return false;
      }
    }
    return true;
  }