function() {
  this.paused = false;

  if (this.buffer) {
    this._emitData(this.buffer);
    this.buffer = null;
  }

  // hasn't opened yet.
  if (null == this.fd) return;

  this._read();
}