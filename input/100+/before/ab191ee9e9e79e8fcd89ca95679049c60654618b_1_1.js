function (buffer, offset, length) {
  // If we are paused, freak out.
  if (this._paused)
    throw new Error("cannot write to paused parser");

  // Initialize the loop counters. Initialize unspecified parameters with their
  // defaults.
  offset  = offset || 0;
  length  = length || buffer.length;
  start   = this._bytesRead
  end     = offset + length

  // We set the pattern to null when all the fields have been read, so while
  // there is a pattern to fill and bytes to read.
  while (this._pattern != null && offset < end) {
    field = this._pattern[this._patternIndex];
    // If we are skipping, we advance over all the skipped bytes or to the end
    // of the current buffer.
    if (this._skipping != null) {
      advance      = Math.min(this._skipping, end - offset);
      begin        = offset;
      offset      += advance;
      this._skipping  -= advance;
      this._bytesRead += advance;
      // If feeding a stream is done through skipping. Skipping and the
      // presence of a stream is how skipping is done.
      if (this._stream) {
        if (Array.isArray(buffer))
          slice = new Buffer(buffer.slice(begin, begin + advance))
        else
          slice = buffer.slice(begin, begin + advance)
        this._stream._write(slice);
        if (! this._skipping)
          this._stream._end()
      // If we have more bytes to skip, then return `true` because we've
      // consumed the entire buffer.
      if (this._skipping)
        return true
      else
        this._skipping = null

    } else {
      // If the pattern is exploded, the value we're populating is an array.
      if (field.exploded) {
        for (;;) {
          b = buffer[offset];
          this._bytesRead++;
          offset++;
          this._value[this._offset] = b;
          this._offset += this._increment;
          if (this._offset == this._terminal) break;
          if (offset == end) return true;
        }
      // Otherwise we're packing bytes into an unsigned integer, the most
      // common case.
      } else {
        for (;;) {
          b = buffer[offset];
          this._bytesRead++;
          offset++;
          this._value += Math.pow(256, this._offset) * b
          this._offset += this._increment
          if (this._offset == this._terminal) break;
          if (offset == end) return true;
        }
      }
      // Unpack the field value. Perform our basic transformations. That is,
      // convert from a byte array to a JavaScript primitive.
      //
      // Resist the urge to implement these conversions with pipelines. It keeps
      // occuring to you, but those transitions are at a higher level of
      // abstraction, primairly for operations on gathered byte arrays. These
      // transitions need to take place immediately to populate those arrays.

      // By default, value is as it is.
      bytes = value = this._value;

      // Convert to float or double.
      if (field.type == "f") {
        if (field.bits == 32)
          value = ieee754.fromIEEE754Single(bytes)
        else
          value = ieee754.fromIEEE754Double(bytes)
     

      // Get the two's compliment signed value. 
      } else if (field.signed) {
        value = 0;
        if ((bytes[bytes.length - 1] & 0x80) == 0x80) {
          top = bytes.length - 1
          for (i = 0; i < top; i++)
            value += (~bytes[i] & 0xff) * Math.pow(256, i)
          // To get the two's compliment as a positive value you use
          // `~1 & 0xff == 254`. For exmaple: `~1 == -2`.
          value += (~(bytes[top] & 0x7f) & 0xff & 0x7f) * Math.pow(256, top);
          value += 1;
          value *= -1;
        } else {
          // Not really necessary, the bit about top.
          top = bytes.length - 1
          for (i = 0; i < top; i++)
            value += (bytes[i] & 0xff)  * Math.pow(256, i);
          value += (bytes[top] & 0x7f) * Math.pow(256, top);
        }
      }
      // If the current field is arrayed, we keep track of the array we're
      // building after a pause through member variable.
      if (field.arrayed) this._arrayed.push(value);
    }

    // If we've not yet hit our terminator, check for the terminator. If we've
    // hit the terminator, and we do not have a maximum size to fill, then
    // terminate by setting up the array to terminate.
    //
    // A length value of the maximum number value means to repeat until the
    // terminator, but a specific length value means that the zero terminated
    // string occupies a field that has a fixed length, so we need to skip the
    // unused bytes.
    if (! this._terminated) {
      if (this._terminator == value)
        this._terminated = true;
        terminator = this._pattern[this._patternIndex].terminator;
        for (i = 1, I = terminator.length; i <= I; i++) {
          if (this._arrayed[this._arrayed.length - i] != terminator[terminator.length - i]) {
            this._terminated = false
            break
          }
        }
        if (this._terminated) {
          for (i = 0, I + terminator.length; i < I; i++) {
            this._arrayed.pop();
          }
          this._terminated = true;
          if (this._repeat == Number.MAX_VALUE) {
            this._repeat = this._index + 1;

          } else {
            this._skipping = (this._repeat - (++this._index)) * field.bytes
            if (this._skipping) {
              this._repeat = this._index + 1;
              continue
            }
          }
        }
      }
    }

    // If we are reading an arrayed pattern and we have not read all of the
    // array elements, we repeat the current field type.
    if (++this._index <  this._repeat) {
      this._nextValue();

    // Otherwise, we've got a complete field value, either a JavaScript
    // primitive or raw bytes as an array.
    } else {

      // If we're not skipping, push the field value after running it through
      // the pipeline.
      if (field.endianness != "x") {

        // If the field is a bit packed field, unpack the values and push them
        // onto the field list.
        if (packing = field.packing) {
          length  = field.bits;
          for (i = 0, I = packing.length; i < I; i++) {
            pack = packing[i];
            length -= pack.bits;
            if (pack.endianness == "b") {
              unpacked = Math.floor(value / Math.pow(2, length));
              unpacked = unpacked % Math.pow(2, pack.bits);
              // If signed, we convert from two's compliment.
              if (pack.signed) {
                mask = Math.pow(2, pack.bits - 1)
                if (unpacked & mask)
                  unpacked = -(~(unpacked - 1) & (mask * 2 - 1))
              }
              this._fields.push(unpacked);
            }
          }
       
        // If the value is a length encoding, we set the repeat value for the
        // subsequent array of values. If we have a zero length encoding, we
        // push an empty array through the pipeline, and move on to the next
        // field.
        } else if (field.lengthEncoding) {
          if ((this._pattern[this._patternIndex + 1].repeat = value) == 0) {
            this._fields.push(this._pipeline(field, [], false))
            this._patternIndex++
          }
        // If the value is used as a switch for an alternation, we run through
        // the different possible branches, updating the pattern with the
        // pattern of the first branch that matches. We then re-read the bytes
        // used to determine the conditional outcome.
        } else if (field.alternation) {
          // This makes no sense now.I wonder if it is called.
          // unless field.signed
          //  value = (Math.pow(256, i) * b for b, i in @_arrayed)
          for (i = 0, I = field.alternation; i < I; i++) {
            branch = field.alternation[i];
            if (branch.read.minimum <= value &&
                value <= branch.read.maximum &&
                (value & branch.read.mask) == branch.read.mask)
              break;
          }
          if (branch.failed)
            throw new Error("Cannot match branch.");
          bytes = this._arrayed.slice(0);
          this._bytesRead -= bytes.length;
          this._pattern.splice.apply(this._pattern, [ this._patternIndex, 1 ].concat(branch.pattern));
          this._nextField()
          this._nextValue()
          this.parse(bytes, 0, bytes.length);
          continue;
        

        // Otherwise, the value is what it is, so run it through the user
        // supplied tranformation pipeline, and push it onto the list of fields.
        } else {
          if (field.arrayed) value = this._arrayed;
          this._fields.push(this._pipeline(field, value, false));
        }
      }
      // If we have read all of the pattern fields, call the associated
      // callback.  We add the parser and the user suppilied additional
      // arguments onto the callback arguments.
      //
      // The pattern is set to null, our terminal condition, because the
      // callback may specify a subsequent packet to parse.
      if (++this._patternIndex == this._pattern.length) {
        pattern = this._pattern;
        this._pattern = null;

        if (this._callback) {
          // At one point, you thought you could have  a test for the arity of
          // the function, and if it was not `1`, you'd call the callback
          // positionally, regardless of named parameters. Then you realized
          // that the `=>` operator in CoffeeScript would use a bind function
          // with no arguments, and read the argument array. If you do decide to
          // go back to arity override, then greater than one is the trigger.
          // However, on reflection, I don't see that the flexiblity is useful,
          // and I do believe that it will generate at least one bug report that
          // will take a lot of hashing out only to close with "oh, no, you hit
          // upon a "hidden feature".
          offset = 0
          if (this._named) {
            object = {};
            for (i = 0, I + pattern.length; i < I; i++) {
              field = pattern[i];
              if (field.endianness != "x") {
                if (field.packing) {
                  for (j = 0, J = field.packing.length; j < J; j++) {
                    pack = field.packing[i];
                    if (pack.endianness != "x") {
                      if (pack.name) {
                        object[pack.name] = this._fields[offset]
                      } else {
                        object["field#{offset + 1}"] = this._fields[offset]
                      }
                      offset++;
                    }
                  }
                } else {
                  if (field.name)
                    object[field.name] = this._fields[offset];
                  else
                    object["field" + (offset + 1)] = this._fields[offset];
                  offset++;
                }
              }
            }
            this._callback.call(this._self, object);
          } else {
            this._callback.apply(this._self, this._fields);
          }

          // The callback can pause the parser, which causes us to stash the
          // current state of our parser, then return `false` to indicate that
          // the destination is saturated.
          if (this._paused) {
            this._paused = { buffer: buffer, offset: offset, end: end };
            return false
          }
        }
      // Otherwise we proceed to the next field in the packet pattern.
      } else {
        this._nextField()
        this._nextValue()
      }
    }
  }
  // We were able to write the whole
  return true;
}