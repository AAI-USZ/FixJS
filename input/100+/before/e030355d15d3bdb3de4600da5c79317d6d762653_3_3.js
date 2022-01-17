function(p1, p2) {
    var i;
    p1 = p1.slice();
    p2 = p2.slice();
    p1.unshift('data');
    p2.unshift('data');
    p1 = p1.slice(0, (p1.length - 1));
    p2 = p2.slice(0, (p2.length - 1));
    if (p2.length === 0) return -1;
    i = 0;
    while (p1[i] === p2[i] && i < p1.length) {
      i++;
      if (i === p2.length) return i - 1;
    }
  }