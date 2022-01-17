f  var member,
      result;

  if (!priority) priority = 0;

  switch (this.peek().type) {
    case '++':
    case '--':
    case '!':
    case '+':
    case '-':
      member = this.parsePrefixUnOp(this.peek().type);
      break;
    case '{':
      member = this.parseObjectLiteral();
      break;
    case '[':
      member = this.parseArrayLiteral();
      break;
    case 'typeof':
    case 'sizeof':
    case 'keysof':
    case 'clone':
    case 'delete':
      var type = this.peek().type;
      this.skip();

      var expr = this.parseExpression(7);
      if (!expr) return this.setError('Expected body of prefix operation');

      member = [type, expr];
      break;
    default:
      member = this.parseMember();
      break;
  }

  switch (this.peek().type) {
    case '=':
      if (!member) return this.setError('Expected lhs before "="');
      var value = this.parseExpression();
      if (!value) return this.setError('Expected rhs after "="');

      result = ['assign', member, value];
      break;
    default:
      result = member;
      break;
  }

  if (!result) return;

  var type = this.peek().type;
  switch (type) {
    case '++':
    case '--':
      this.skip();
      result = ['post-unop', type, result];
      break;
    case '...':
      this.skip();
      result = ['vararg', result];
      break;
    default:
      break;
  }

  var initial,
      tmp;
  do {
    initial = result;
    if (tmp = this.parseBinOp(result, priority)) {
      result = tmp;
    }
  } while (initial != result);

  return result;
});
