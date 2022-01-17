function(p1, p2, ignoreLast) {
    var i, p, _len;
    if (p1.length !== p2.length) return false;
    for (i = 0, _len = p1.length; i < _len; i++) {
      p = p1[i];
      if (p !== p2[i] && (!ignoreLast || i !== p1.length - 1)) return false;
    }
    return true;
  }