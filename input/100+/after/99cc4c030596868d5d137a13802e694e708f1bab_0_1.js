function(s, n) {
    var indent;
    indent = Math.max(1, n - s.length);
    return s + repeat(indent);
  }