function(op, otherOp, goForwards, side) {
    var chunk, component, length, newOp, peek, take, _i, _len, _ref, _ref1;
    checkOp(op);
    checkOp(otherOp);
    newOp = [];
    _ref = makeTake(op), take = _ref[0], peek = _ref[1];
    for (_i = 0, _len = otherOp.length; _i < _len; _i++) {
      component = otherOp[_i];
      length = componentLength(component);
      if (component.i !== void 0) {
        if (goForwards) {
          if (side === 'left') {
            while (((_ref1 = peek()) != null ? _ref1.i : void 0) !== void 0) {
              append(newOp, take());
            }
          }
          append(newOp, length);
        } else {
          while (length > 0) {
            chunk = take(length, true);
            if (chunk === null) {
              throw new Error('The transformed op is invalid');
            }
            if (chunk.d !== void 0) {
              throw new Error('The transformed op deletes locally inserted characters - it cannot be purged of the insert.');
            }
            if (typeof chunk === 'number') {
              length -= chunk;
            } else {
              append(newOp, chunk);
            }
          }
        }
      } else {
        while (length > 0) {
          chunk = take(length, true);
          if (chunk === null) {
            throw new Error('The op traverses more elements than the document has');
          }
          append(newOp, chunk);
          if (!chunk.i) {
            length -= componentLength(chunk);
          }
        }
      }
    }
    while ((component = take())) {
      if (component.i === void 0) {
        throw new Error("Remaining fragments in the op: " + component);
      }
      append(newOp, component);
    }
    return newOp;
  }