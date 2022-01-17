function () {
  // Get the next pattern.
  var pattern = this._pattern[this._patternIndex], value;

  // If skipping, skip over the count of bytes.
  if (pattern.endianness == "x") {
    this._skipping  = pattern.bytes;

  // Create the empty value and call the inherited `@_nextValue`.
  } else {
    value = pattern.exploded ? [] : 0;
  }
  Packet.prototype._nextValue.call(this, value);
}