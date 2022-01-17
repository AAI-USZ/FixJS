function(op) {
    var c, newOp, _i, _len;
    newOp = [];
    if (!isArray(op)) op = [op];
    for (_i = 0, _len = op.length; _i < _len; _i++) {
      c = op[_i];
      if (c.p == null) c.p = [];
      json.append(newOp, c);
    }
    return newOp;
  }