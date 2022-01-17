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
  // quacks like a stream and pipe it back to this instance. Otherwise throw
  // an error.
  if (input) {

    // is it a buffer?
    if (Buffer.isBuffer(input))
      this.end(input);

    // does it quack like a stream?
    else if (typeof input.pipe === 'function')
      input.pipe(this);

    // can't handle it.
    else {
      var err = new TypeError('PNG constructor takes either a buffer or a stream');
      err.input = input;
      err.inputType = typeof input;
      throw err;
    }
  }
}