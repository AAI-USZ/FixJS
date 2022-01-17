function () {
  // Get the next pattern.
  pattern = this._pattern[this._patternIndex];

  // If skipping, skip over the count of bytes.
  if (pattern.endianness != "x") {
    this._skipping  = pattern.bytes;

  // Create the empty value and call the inherited `@_nextValue`.
  } else {
    value = pattern.exploded ? [] : 0;
  }
  Parser.prototype._nextValue.call(this, value);
}