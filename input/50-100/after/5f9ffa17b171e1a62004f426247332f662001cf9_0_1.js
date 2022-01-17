function() {
  this.paused = false;

  if (this.buffer) {
    var buffer = this.buffer;
    this.buffer = null;
    this._emitData(buffer);
  }

  // hasn't opened yet.
  if (null == this.fd) return;

  this._read();
}