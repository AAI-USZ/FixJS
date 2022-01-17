function(value) {
  if (value === null) {
    this._allocate(1);
    this._buffer[this._offset] = 251;
    return;
  }

  if (value <= 250) {
    this._allocate(1);
    this._buffer[this._offset] = value;
    return;
  }

  if (value > IEEE_754_BINARY_64_PRECISION) {
    throw new Error(
      'LengthCodedBinary.SizeExceeded: JS precision range exceeded, your ' +
      'number is > 53 bit: "' + value + '"'
    );
  }

  if (value <= BIT_16) {
    this._allocate(3)
    buffer[this._offset++] = 252;
  } else if (value <= BIT_24) {
    this._allocate(4)
    buffer[this._offset++] = 253;
  } else {
    this._allocate(9);
    buffer[this._offset++] = 254;
  }

  // 16 Bit
  this._buffer[this._offset++] = value & 0xff;
  this._buffer[this._offset++] = (value >> 8) & 0xff;

  if (value <= BIT_16) return;

  // 24 Bit
  this._buffer[this._offset++] = (value >> 16) & 0xff;

  if (value <= BIT_24) return;

  this._buffer[this._offset++] = (value >> 24) & 0xff;

  // Hack: Get the most significant 32 bit (JS bitwise operators are 32 bit)
  value = value.toString(2);
  value = value.substr(0, value.length - 32);
  value = parseInt(value, 2);

  this._buffer[this._offset++] = value & 0xff;
  this._buffer[this._offset++] = (value >> 8) & 0xff;
  this._buffer[this._offset++] = (value >> 16) & 0xff;

  // Set last byte to 0, as we can only support 53 bits in JS (see above)
  this._buffer[this._offset++] = 0;
}