function(op, otherOp, type) {
      var left, right, _, _ref, _ref2;
      if (!(type === 'left' || type === 'right')) {
        throw new Error("type must be 'left' or 'right'");
      }
      if (otherOp.length === 0) return op;
      if (op.length === 1 && otherOp.length === 1) {
        return transformComponent([], op[0], otherOp[0], type);
      }
      if (type === 'left') {
        _ref = transformX(op, otherOp), left = _ref[0], _ = _ref[1];
        return left;
      } else {
        _ref2 = transformX(otherOp, op), _ = _ref2[0], right = _ref2[1];
        return right;
      }
    }