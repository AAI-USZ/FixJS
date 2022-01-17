function expression(operator, intPlease) {
        var a, b;
        if (operator.isBinary()) {
          b = state.stack.pop();
          a = state.stack.pop();
          if (intPlease) {
            a = asInt32(a);
            b = asInt32(b);
          }
          push(new BinaryExpression(operator.name, a, b));
        } else {
          a = state.stack.pop();
          if (intPlease) {
            a = asInt32(a);
          }
          push(new UnaryExpression(operator.name, a));
        }
      }