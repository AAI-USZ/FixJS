function(op1, op2) {
    var chunk, chunkLength, component, length, result, take, _, _i, _len, _ref;
    if (op1 === null || op1 === void 0) {
      return op2;
    }
    checkOp(op1);
    checkOp(op2);
    result = [];
    _ref = makeTake(op1), take = _ref[0], _ = _ref[1];
    for (_i = 0, _len = op2.length; _i < _len; _i++) {
      component = op2[_i];
      if (typeof component === 'number') {
        length = component;
        while (length > 0) {
          chunk = take(length);
          if (chunk === null) {
            throw new Error('The op traverses more elements than the document has');
          }
          append(result, chunk);
          length -= componentLength(chunk);
        }
      } else if (component.i !== void 0) {
        append(result, {
          i: component.i
        });
      } else {
        length = component.d;
        while (length > 0) {
          chunk = take(length);
          if (chunk === null) {
            throw new Error('The op traverses more elements than the document has');
          }
          chunkLength = componentLength(chunk);
          if (chunk.i !== void 0) {
            append(result, {
              i: chunkLength
            });
          } else {
            append(result, {
              d: chunkLength
            });
          }
          length -= chunkLength;
        }
      }
    }
    while ((component = take())) {
      if (component.i === void 0) {
        throw new Error("Remaining fragments in op1: " + component);
      }
      append(result, component);
    }
    return result;
  }