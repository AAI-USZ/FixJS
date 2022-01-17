function parseBlock() {
  if (this.peek().type !== '{') return this.setError('Expected "{" (block)');
  this.skip();

  var result = ['block', []];

  while (this.peek().type !== 'end' && this.peek().type !== '}') {
    var stmt = this.parseStatement();
    if (!stmt) return this.setError('Expected statement after "{"');

    result[1].push(stmt);
  }

  if (this.peek().type !== '}') return this.setError('Expected "}"');
  this.skip();

  if (result[1].length === 0) result[1].push(['nop']);

  return result;
}