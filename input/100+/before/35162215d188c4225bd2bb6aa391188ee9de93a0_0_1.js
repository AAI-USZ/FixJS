function StreamPng(input) {
  if (!(this instanceof StreamPng))
    return new StreamPng(input);

  this.parser = new BitReader();
  this.expecting = 'signature';
  this.strict = true;
  this.writable = true;
  this.readable = true;
  this.chunks = [];
  this.injections = []
  this.finished = !(input);

  // Input can be either a buffer or a stream. When we get a buffer, we can
  // pretend it's a stream by writing the entire buffer at once, as if we just
  // got a single `data` event. If it's not a buffer, check whether input
  // quacks like a stream and pipe it back to this instance. Otherwise emit
  // an error. We don't want to throw an error because the object is still
  // salvageable.
  if (input) {
    if (Buffer.isBuffer(input))
      this.write(input);
    else if (typeof input.pipe === 'function')
      input.pipe(this);
    else {
      var err = new TypeError('PNG constructor takes either a buffer or a stream');
      this.emit('error', err);
    }
  }
}