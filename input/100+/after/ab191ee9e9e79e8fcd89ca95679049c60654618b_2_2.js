function () {
  var shiftable = __slice.call(arguments, 0);
  if (Array.isArray(shiftable[0])) {
    var buffer = shiftable.shift();
    var bufferLength = Number.MAX_VALUE;
    var ownsBuffer = false;
  } else if (Buffer.isBuffer(shiftable[0])) {
    var buffer = shiftable.shift();
    var bufferLength = buffer.length;
    var ownsBuffer = false;
  } else {
    var buffer = this._buffer;
    var bufferLength = this._buffer.length;
    var ownsBuffer = true;
  }
  var callback = this._reset(shiftable);
  this._callback = null;

  var read = 0;
  while (this._pattern) {
    if (read == bufferLength) {
      if (ownsBuffer) {
        expanded = new Buffer(buffer.length * 2);
        buffer.copy(expanded);
        buffer = expanded;
      } else {
        this.emit("error", new Error("buffer overflow"));
        return;
      }
    }
    read += this._serialize(buffer, read, bufferLength - read);
  }

  if (ownsBuffer) this._buffer = buffer;

  if (callback != null) {
    callback.call(this._self, buffer.slice(0, read));
  }
}