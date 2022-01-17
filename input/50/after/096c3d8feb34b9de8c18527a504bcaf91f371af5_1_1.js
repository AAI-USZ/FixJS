function(length) {
  var offset = this._offset;
  var end = offset + length;
  var value = this._buffer.toString('utf-8', offset, end);

  this._offset = end;
  return value;
}