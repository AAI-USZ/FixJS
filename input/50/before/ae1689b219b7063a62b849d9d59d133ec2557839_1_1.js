function() {
  this.piped = true;
  stream.Stream.prototype.pipe.apply(this, arguments);
}