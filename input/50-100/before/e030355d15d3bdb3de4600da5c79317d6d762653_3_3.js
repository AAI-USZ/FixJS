function(p1, p2) {
    var e, i, _len;
    if (p1.length !== p2.length) return false;
    for (i = 0, _len = p1.length; i < _len; i++) {
      e = p1[i];
      if (e !== p2[i]) return false;
    }
    return true;
  }