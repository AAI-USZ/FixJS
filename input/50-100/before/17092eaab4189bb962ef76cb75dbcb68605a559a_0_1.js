function execute() {
  var stmt,
      result = [];

  while (this.trimCr(), stmt = this.parseStatement()) {
    result.push(stmt);
  }

  // We should reach the end of file
  // TODO: print out error with line number and offset
  if (this.peek().type !== 'end') {
    if (!this.error) throw new Error('Unexpected parser error!');
    throw new Error(
      'Parser failed at: ' + this.error.offset + '\n' +
      this.error.message
    );
  }

  return result;
}