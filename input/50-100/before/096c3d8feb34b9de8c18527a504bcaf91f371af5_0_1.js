function(bytes) {
  var bytesRemaining = this._buffer.length - this._offset;
  if (bytesRemaining >= bytes) {
    return;
  }

  var oldBuffer = this._buffer;

  this._buffer = new Buffer(oldBuffer.length + bytes);
  oldBuffer.copy(this._buffer);
}