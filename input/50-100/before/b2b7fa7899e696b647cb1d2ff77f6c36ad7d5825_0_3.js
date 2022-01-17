function() {
  if (this._socket.ref) {
    this._socket.ref();
  } else if (this._timer) {
    clearTimeout(this._timer);
    this._timer = null;
  }
}