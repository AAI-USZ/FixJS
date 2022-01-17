function () {
  var shiftable = __slice.call(arguments, 0);
  if (Array.isArray(shiftable[0])) {
    buffer = shiftable.shift();
    bufferLength = Number.MAX_VALUE;
    ownsBuffer = false;
  } else if (Buffer.isBuffer(shiftable[0])) {
    buffer = shiftable.shift();
    bufferLength = buffer.length;
    ownsBuffer = false;
  } else {
    buffer = this._buffer;
    bufferLength = this._buffer.length;
    ownsBuffer = true;
  }
  callback = this._reset(shiftable);
  this._callback = null;

  read = 0;
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