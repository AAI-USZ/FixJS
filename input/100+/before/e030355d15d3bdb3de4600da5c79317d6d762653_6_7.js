function(newOp, c) {
    var last, _ref, _ref2;
    if (c.i === '' || c.d === '') return;
    if (newOp.length === 0) {
      return newOp.push(c);
    } else {
      last = newOp[newOp.length - 1];
      if ((last.i != null) && (c.i != null) && (last.p <= (_ref = c.p) && _ref <= (last.p + last.i.length))) {
        return newOp[newOp.length - 1] = {
          i: strInject(last.i, c.p - last.p, c.i),
          p: last.p
        };
      } else if ((last.d != null) && (c.d != null) && (c.p <= (_ref2 = last.p) && _ref2 <= (c.p + c.d.length))) {
        return newOp[newOp.length - 1] = {
          d: strInject(c.d, last.p - c.p, last.d),
          p: c.p
        };
      } else {
        return newOp.push(c);
      }
    }
  }