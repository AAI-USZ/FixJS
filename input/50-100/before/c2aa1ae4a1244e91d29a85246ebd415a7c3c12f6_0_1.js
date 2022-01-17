function(data) {
  var tokens = data.split('\n');
  tokens[0] += this.buffer;
  while (tokens.length > 1) {
    this.dispatch(tokens.shift());
  }
  this.buffer = tokens[0];
}