function(err) {
  if (this._ended) {
    return;
  }

  this._ended = true;

  if (err) {
    this._addLongStackTrace(err);
    this.emit('error', err);
  }

  if (this._callback) {
    this._callback.apply(this, arguments);
  }

  this.emit('end');
}