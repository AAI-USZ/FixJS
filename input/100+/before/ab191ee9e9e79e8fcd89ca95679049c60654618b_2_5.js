function (buffer, offset, length) {
  start     = offset;
  end       = offset + length;

  // We set the pattern to null when all the fields have been written, so while
  // there is a pattern to fill and space to write.
  while (this._pattern &&  offset < end) {
    if (this._skipping) {
      advance         = Math.min(this._skipping, end - offset);
      offset         += advance;
      this._skipping      -= advance;
      this._bytesWritten  += advance;
      if (this._skipping) return offset - start;

    } else {
      // If the pattern is exploded, the value we're writing is an array.
      if (this._pattern[this._patternIndex].exploded) {
        for (;;) {
          buffer[offset] = this._value[this._offset];
          this._offset += this._increment;
          this._bytesWritten++;
          offset++;
          if (this._offset ==  this._terminal) break;
          if (offset == end) return offset - start;
        }
      // Otherwise we're unpacking bytes of an unsigned integer, the most common
      // case.
      } else {
        for (;;) {
          buffer[offset] = Math.floor(this._value / Math.pow(256, this._offset)) & 0xff;
          this._offset += this._increment;
          this._bytesWritten++;
          offset++;
          if (this._offset ==  this._terminal) break;
          if (offset ==  end) return offset - start;
        }
      }
    }
    // If we have not terminated, check for the termination state change.
    // Termination will change the loop settings.
    if (this._terminates) {
      if (this._terminated) {
        if (this._repeat ==  Number.MAX_VALUE) {
          this._repeat = this._index + 1
        } else if (this._pattern[this._patternIndex].padding != null)  {
          this._padding = this._pattern[this._patternIndex].padding
        } else {
          this._skipping = (this._repeat - (++this._index)) * this._pattern[this._patternIndex].bytes;
          if (this._skipping) {
            this._repeat = this._index + 1;
            continue;
          }
        }
      } else {
        // If we are at the end of the series, then we create an empty outgoing
        // array to hold the terminator, because the outgoing series may be a
        // buffer. We insert the terminator at next index in the outgoing array.
        // We then set repeat to allow one more iteration before callback.
        if (this._outgoing[this._patternIndex].length == this._index + 1) {
          this._terminated = true;
          this._outgoing[this._patternIndex] = [];
          terminator = this._pattern[this._patternIndex].terminator;
          for (i = 0, I = terminator.length; i < I; i++) {
            this._outgoing[this._patternIndex][this._index + 1 + i] = terminator[i];
          }
        }
      }
    }
    // If we are reading an arrayed pattern and we have not read all of the
    // array elements, we repeat the current field type.
    if (++this._index < this._repeat) {
      this._nextValue()

    // If we have written all of the packet fields, call the associated
    // callback with this parser.
    //
    // The pattern is set to null, our terminal condition, before the callback,
    // because the callback may specify a subsequent packet to parse.
    } else if (++this._patternIndex ==  this._pattern.length) {
      this._pattern = null

      if (this._callback != null)
        this._callback.call(this._self, this);

    } else {

      delete        this._padding;
      this._repeat      = this._pattern[this._patternIndex].repeat;
      this._terminated  = ! this._pattern[this._patternIndex].terminator;
      this._terminates  = ! this._terminated;
      this._index       = 0;

      this._nextField();
      this._nextValue();
    }
  }
  this._outgoing = null;

  return offset - start;
}