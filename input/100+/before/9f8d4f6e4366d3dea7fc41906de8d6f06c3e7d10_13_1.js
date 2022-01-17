function applyBrackets(str, pos, func) {
    var ast, brackets, end, prev, result, start;
    ast = Parse.parseFull(str)[0];
    brackets = LZ.bracket(ast, pos);
    result = '';
    prev = 0;
    while (brackets !== Parse.Nil) {
      start = brackets.head.head;
      end = brackets.head.tail.head;
      result += "" + (str.substring(prev, start)) + (func(str.substring(start, end), result === ''));
      brackets = brackets.tail;
      prev = end;
    }
    return "" + result + (str.substring(prev));
  }