function expression(operator) {
        var a, b;
        if (operator.isBinary()) {
          b = state.stack.pop();
          a = state.stack.pop();
          push(new BinaryExpression(operator.name, a, b));
        } else {
          a = state.stack.pop();
          push(new UnaryExpression(operator.name, a));
        }
      }