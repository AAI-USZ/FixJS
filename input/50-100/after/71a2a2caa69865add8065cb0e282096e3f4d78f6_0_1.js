function() {
  if (!this._handle || !this._handle.getpeername) {
    return {};
  }
  if (!this._peername) {
    this._peername = this._handle.getpeername();
    // getpeername() returns null on error
    if (this._peername === null) {
      return {};
    }
  }
  return this._peername;
}