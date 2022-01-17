function(position, op, side) {
    var c, insertAfter, _i, _len;
    insertAfter = side === 'right';
    for (_i = 0, _len = op.length; _i < _len; _i++) {
      c = op[_i];
      position = transformPosition(position, c, insertAfter);
    }
    return position;
  }