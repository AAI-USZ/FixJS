function getFastValue(a, op, b, type) {
  a = a.toString();
  b = b.toString();
  if (isNumber(a) && isNumber(b)) {
    if (op == 'pow') {
      return Math.pow(a, b).toString();
    } else {
      return eval(a + op + b).toString();
    }
  }
  if (op == 'pow') {
    if (a == '2' && isIntImplemented(type)) {
      return '(1 << (' + b + '))';
    }
    return 'Math.pow(' + a + ', ' + b + ')';
  }
  if (op in PLUS_MUL && isNumber(a)) { // if one of them is a number, keep it last
    var c = b;
    b = a;
    a = c;
  }
  if (op in MUL_DIV) {
    if (op == '*') {
      if (a == 0 || b == 0) {
        return '0';
      } else if (a == 1) {
        return b;
      } else if (b == 1) {
        return a;
      } else if (isNumber(b) && type && isIntImplemented(type) && Runtime.getNativeTypeSize(type) <= 32) {
        var shifts = Math.log(parseFloat(b))/Math.LN2;
        if (shifts % 1 == 0) {
          return '(' + a + '<<' + shifts + ')';
        }
      }
    } else {
      if (a == '0') {
        return '0';
      } else if (b == 1) {
        return a;
      } // Doing shifts for division is problematic, as getting the rounding right on negatives is tricky
    }
  } else if (op in PLUS_MINUS) {
    if (b[0] == '-') {
      op = op == '+' ? '-' : '+';
      b = b.substr(1);
    }
    if (a == 0) {
      return op == '+' ? b : '(-' + b + ')';
    } else if (b == 0) {
      return a;
    }
  }
  return '(' + a + ')' + op + '(' + b + ')';
}