function(op) {
    var c, newOp, _i, _len, _ref;
    newOp = [];
    if ((op.i != null) || (op.p != null)) {
      op = [op];
    }
    for (_i = 0, _len = op.length; _i < _len; _i++) {
      c = op[_i];
      if ((_ref = c.p) == null) {
        c.p = 0;
      }
      append(newOp, c);
    }
    return newOp;
  }