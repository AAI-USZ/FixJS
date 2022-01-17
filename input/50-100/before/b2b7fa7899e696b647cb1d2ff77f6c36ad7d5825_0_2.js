function() {
  var self = this;

  if (this._active_count <= 0) {
    if (this._socket.unref) {
      this._socket.unref();
    } else if (!this._timer) {
      this._timer = setTimeout(function() {
        self.close();
      }, 300);
    }
  }
}