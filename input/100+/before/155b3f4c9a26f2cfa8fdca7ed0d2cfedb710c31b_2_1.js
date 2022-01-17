function parseStatement(leaveTrail) {
  if (leaveTrail === undefined) leaveTrail = false;

  this.trimCr();

  switch (this.peek().type) {
    case 'return':
      this.skip();
      var expr = this.parseExpression();

      return expr && ['return', expr];
    case 'continue':
    case 'break':
      var token = this.skip();
      return [token.type];
      break;
    case 'if':
      this.skip();
      if (!this.peek().type === '(') {
        return this.setError('Expected "(" before if\'s condition');
      }
      this.skip();

      var cond = this.parseExpression();
      if (!cond) return this.setError('Expected if\'s condition');

      if (!this.peek().type === ')') {
        return this.setError('Expected ")" after if\'s condition');
      }
      this.skip();

      var body = this.parseBlock(),
          elseBody;

      if (!body) {
        body = this.parseStatement(true);
      } else {
        if (this.peek().type === 'else') {
          this.skip();
          elseBody = this.parseBlock() || this.parseStatement(true);

          if (!elseBody) return this.setError('Expected else\'s body');
        }
      }

      if (!body) return this.setError('Expected if\'s body');

      return elseBody ? ['if', cond, body, elseBody] : ['if', cond, body];
    case 'while':
      this.skip();
      if (this.peek().type !== '(') {
        return this.setError('Expected "(" before while\'s condition');
      }
      this.skip();

      var cond = this.parseExpression();
      if (!cond) return this.setError('Expected while\'s condition');

      if (this.peek().type !== ')') {
        return this.setError('Expected ")" after while\'s condition');
      }
      this.skip();

      var body = this.parseBlock();
      if (!body) return this.setError('Expected body after while\'s condition');

      return ['while', cond, body];
    case '{':
      return this.parseBlock();
    default:
      return this.parseExpression();
  }

  // Consume Cr or BraceClose
  if (this.peek().type !== 'end' && this.peek().type !== 'cr' &&
      this.peek().type !== '}') {
    return this.setError('Expected CR, EOF, or "}" after statement');
  }
  if (!leaveTrail) this.trimCr();

  return result;
});
