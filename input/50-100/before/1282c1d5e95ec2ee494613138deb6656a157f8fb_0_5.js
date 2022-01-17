function UnaryOperator(token) {
    if (token == '-') return function(operand) {
      return -operand;
    };
    if (token == '+') return function(operand) {
      return +operand;
    };
    if (token == '!') return function(operand) {
      return !operand;
    };
  }