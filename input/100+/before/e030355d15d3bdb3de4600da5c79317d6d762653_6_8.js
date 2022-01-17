function(op) {
    var c, newOp, _i, _len;
    newOp = [];
    if ((op.i != null) || (op.p != null)) op = [op];
    for (_i = 0, _len = op.length; _i < _len; _i++) {
      c = op[_i];
      if (c.p == null) c.p = 0;
      append(newOp, c);
    }
    return newOp;
  }