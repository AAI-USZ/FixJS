function(newBuffer) {
  var oldBuffer = this._buffer;
  if (!oldBuffer) {
    this._buffer = newBuffer;
    return;
  }

  var bytesRemaining = this._bytesRemaining();
  var newLength = bytesRemaining + newBuffer.length;

  var combinedBuffer = (this._offset > newLength)
    ? oldBuffer.slice(0, newLength)
    : new Buffer(newLength);

  oldBuffer.copy(combinedBuffer, 0, this._offset);
  newBuffer.copy(combinedBuffer, bytesRemaining);

  this._buffer = combinedBuffer;
  this._offset = 0;
}