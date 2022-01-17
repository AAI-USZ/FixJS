function AssertionError(options) {
  this.name = 'AssertionError';
  this.message = options.message;
  this.actual = options.actual;
  this.expected = options.expected;
  this.operator = options.operator;
  if ( ! this.message ) {
    message = this.truncate(JSON.stringify(this.actual), 128) + " " +
              this.operator + " " +
              this.truncate(JSON.stringify(this.expected), 128) 
  }
}