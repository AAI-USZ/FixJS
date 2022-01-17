function(d) {
  if (this._closing) return;
  this._closing = true;
  if (this.enabled) {
    tty.setRawMode(false);
  }
  this.emit('close');
  this._closed = true;
}