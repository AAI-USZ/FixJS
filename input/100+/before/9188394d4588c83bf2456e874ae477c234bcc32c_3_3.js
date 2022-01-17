function(match, pre, _, num) {
      return Calculator.isOperator(match[0]) ? pre + '(0-' + num + ')' : match;
    }