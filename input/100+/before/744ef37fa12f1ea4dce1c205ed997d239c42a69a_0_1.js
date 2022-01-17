function(number, set) {
    var elements, i, left, leftBracket, matches, n, right, rightBracket, str, total, _len, _ref;
    matches = (_ref = set.match(validatePattern)) != null ? _ref : [];
    n = matches.length;
    if (n < 3) throw 'Invalid set ' + set + '.';
    if (set.match(/\{\s*n:([^\}]+)\}/)) return true;
    leftBracket = matches[0];
    rightBracket = matches[n - 1];
    elements = [];
    for (i = 0, _len = matches.length; i < _len; i++) {
      str = matches[i];
      if (i !== 0 && i !== n - 1 && str !== ',') {
        elements.push((str === '-Inf' ? this.inf * -1 : str === '+Inf' || str === 'Inf' ? this.inf : Number(str)));
      }
    }
    total = elements.length;
    number = Number(number);
    if (leftBracket === '{' && rightBracket === '}') {
      return __indexOf.call(elements, number) >= 0;
    }    left = leftBracket === '[' ? number >= elements[0] : leftBracket === '(' ? number > elements[0] : false;
    right = rightBracket === ']' ? number <= elements[total - 1] : rightBracket === ')' ? number < elements[total - 1] : false;
    return left && right;
  };
