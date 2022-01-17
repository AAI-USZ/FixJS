function(postfix) {
    var stack = [];

    postfix.forEach(function evaluatePostFix_inner(token) {
      if (!this.isOperator(token)) {
        stack.push(token);
      } else {
        var op2 = stack.pop();
        var op1 = stack.pop();
        var result = this.evaluate[token](op1, op2);
        if (isNaN(result) || !isFinite(result))
          throw { type: 'error', msg: 'Value is ' + result };
        stack.push(result);
      }
    }, this);
    var result = stack.pop();
    if (isNaN(result) || !isFinite(result))
      throw { type: 'error', msg: 'Value is ' + result };
    return result;
  }