function(d, key) {
  if (this.paused) this.resume();
  this.enabled ? this._ttyWrite(d, key) : this._normalWrite(d, key);
}