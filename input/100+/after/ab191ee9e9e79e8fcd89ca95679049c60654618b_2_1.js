function () {
  var i, I, value, packing;
  var pattern = this._pattern[this._patternIndex];

  // If we are skipping without filling we note the count of bytes to skip.
  if (pattern.endianness ==  "x" &&  this._padding == null) {
    this._skipping = pattern.bytes

  // If the pattern is an alternation, we use the current value to determine
  // with alternate to apply. We then update the pattern array with pattern of
  // the matched alternate, and rerun the next field and next value logic.
  } else if (pattern.alternation) {
    value = this._outgoing[this._patternIndex]
    for (i = 0, I = pattern.alternation.length; i < I; i++) {
      alternate = pattern.alternation[i];
      if (alternate.write.minimum <= value &&  value <= alternate.write.maximum) {
        this._pattern.splice.apply(this._pattern, [ this._patternIndex, 1 ].concat(alternate.pattern));
        break
      }
    }
    if (alternate.failed)
      throw new Error("Cannot match alternation.");
    this._nextField()
    this._nextValue()

  // Otherwise, we've got a value to write here and now.
  } else {
    // If we're filling, we write the fill value.
    if (this._padding != null) {
      value = this._padding

    // If the field is arrayed, we get the next value in the array.
    } else if (pattern.arrayed) {
      value = this._outgoing[this._patternIndex][this._index]

    // If the field is bit packed, we update the `this._outgoing` array of values
    // by packing zero, one or more values into a single value. We will also
    // check for bits filled with a pattern specified filler value and pack
    // that in there as well.
    } else if (packing = pattern.packing) {
      count   = 0;
      value   = 0;
      length  = pattern.bits;
      for (i = 0, I = packing.length; i < I; i++) {
        pack = packing[i];
        length -= pack.bits;
        if (pack.endianness ==  "b" || pack.padding != null) {
          unpacked = pack.padding != null ? pack.padding : this._outgoing[this._patternIndex + count++]
          if (pack.signed) {
            range = Math.pow(2, pack.bits - 1)
            if (!( (-range) <= unpacked &&  unpacked <= range - 1))
              throw new Error("value " + unpacked + " will not fit in " + pack.bits + " bits");
            if (unpacked < 0) {
              mask = range * 2 - 1
              unpacked = (~(- unpacked) + 1) & mask
            }
          }
          value += unpacked * Math.pow(2, length)
        }
      }
      this._outgoing.splice(this._patternIndex, count, value);

    // If the current field is a length encoded array, then the length of the
    // the current array value is the next value, otherwise, we have the
    // simple case, the value is the current value.
    } else {
      if (pattern.lengthEncoding) {
        repeat = this._outgoing[this._patternIndex].length;
        this._outgoing.splice(this._patternIndex, 0, repeat);
        this._pattern[this._patternIndex + 1].repeat = repeat;
      }
      value = this._outgoing[this._patternIndex];
    }
    // If the array is not an unsigned integer, we might have to convert it.
    if (pattern.exploded) {
      // Convert a float into its IEEE 754 representation.
      if (pattern.type == "f") {
        if (pattern.bits == 32)
          value = ieee754.toIEEE754Single(value)
        else
          value = ieee754.toIEEE754Double(value)
      
      // Convert a signed integer into its two's complient representation.
      } else if (pattern.signed) {
        copy = Math.abs(value);
        bytes = [];
        // FIXME If the value is greater than zero, we can just change the
        // pattern to packed.
        for (i = 0, I = pattern.bytes.length; i < I; i++) {
          pow = Math.pow(256, i)
          bytes[i] = Math.floor(copy / pow % (pow * 256))
        }
        if (value < 0) {
          carry = 1
          for (i = 0, I = bytes.length; i < I; i++) {
            bytes[i] = (~bytes[i] & 0xff) + carry;
            if (bytes[i] ==  256) bytes[i] = 0;
            else carry = 0;
          }
        }
        value = bytes;
      }
    }
    Packet.prototype._nextValue.call(this, value);
  } 
}