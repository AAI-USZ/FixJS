function(value) {
  if (value === null) {
    this.writeLengthCodedNumber(null);
    return;
  }

  // Typecast undefined into '' and numbers into strings
  value = value || '';
  value = value + '';

  var bytes = Buffer.byteLength(value, 'utf-8');
  this.writeLengthCodedNumber(bytes);

  if (!bytes) {
    return;
  }

  this._allocate(bytes);
  this._buffer.write(value, this._offset, 'utf-8');
  this._offset += bytes;
}