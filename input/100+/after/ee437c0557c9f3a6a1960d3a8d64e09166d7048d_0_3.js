function write(chunk, cb) {
  if (this._hadError) return true;

  if (this._ended) {
    return this.emit('error', new Error('Cannot write after end'));
  }

  if (arguments.length === 1 && typeof chunk === 'function') {
    cb = chunk;
    chunk = null;
  }

  if (!chunk) {
    chunk = null;
  } else if (typeof chunk === 'string') {
    chunk = new Buffer(chunk);
  } else if (!Buffer.isBuffer(chunk)) {
    return this.emit('error', new Error('Invalid argument'));
  }


  var empty = this._queue.length === 0;

  this._queue.push([chunk, cb]);
  this._process();
  if (!empty) {
    this._needDrain = true;
  }
  return empty;
}