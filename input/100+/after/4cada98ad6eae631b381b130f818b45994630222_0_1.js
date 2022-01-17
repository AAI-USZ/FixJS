function(infix) {
    // We cant know up till this point whether - is for negation or subtraction
    // at this point we modify negation operators into (0-N) so 4+-5 -> 4+(0-5)
    infix = infix.replace(
      /(([^0-9])-|^-)([0-9.]+)/g,
      function(match, _, pre, num) {
        pre = pre || '';
        return pre + '(0-' + num + ')';
      }
    );

    // basic tokenisation to ensure we group numbers with >1 digit together
    var tokens = infix.match(/[0-9.]+|\*|\/|\+|\-|\(|\)/g);
    var output = [];
    var stack = [];

    tokens.forEach(function infix2postfix_inner(token) {
      if (/[0-9.]+/.test(token)) {
        output.push(parseFloat(token, 10));
      }

      var precedence = this.precedence;
      var isOperator = this.isOperator;
      if (isOperator(token)) {
        while (isOperator(stack[stack.length - 1]) &&
               precedence(token) <= precedence(stack[stack.length - 1])) {
          output.push(stack.pop());
        }
        stack.push(token);
      }
      if (token === '(') {
        stack.push(token);
      }
      if (token === ')') {
        while (stack.length && stack[stack.length - 1] !== '(') {
          output.push(stack.pop());
        }
        // This is the (
        stack.pop();
      }
    }, this);

    while (stack.length > 0) {
      output.push(stack.pop());
    }

    return output;
  }