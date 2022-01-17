function(writable /*, [options]*/) {
  stream.Stream.prototype.pipe.apply(this, arguments);
}