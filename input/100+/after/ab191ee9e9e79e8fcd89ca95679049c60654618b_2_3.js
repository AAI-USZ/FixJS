function () {
  var shiftable = __slice.call(arguments, 0);
  if (Array.isArray(shiftable[0]))
    shiftable[0] = new Buffer(shiftable[0]);
  if (Buffer.isBuffer(shiftable[0])) {
    slice = shiftable.shift()
    if (this._decoder) {
      string = this._decoder.write(slice)
      this.emit("data", string.length ? string : null);
    } else {
      this.emit("data", slice);
    }
  } else {
    var callback = this._reset(shiftable);
    // Implementing pause requires callbacks.
    this._callback = null
    while (this._pattern) {
      read = this._serialize(this._buffer, 0, this._buffer.length)
      this.write(this._buffer.slice(0, read));
    }
    callback.call(this._self);
  }
}