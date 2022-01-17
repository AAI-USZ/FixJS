function(length) {
  var end = this._offset + length;
  var value = this._buffer.toString('utf-8', this._offset, end);

  this._offset = end;
  return value;
}