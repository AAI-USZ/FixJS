function trigger(state, force) {
  // Grab these as locals, to make them saner to reference and
  // safe to modify.
  var buffer = this.buffer;
  var offset = this.offset;
  var length = this.length;
  var buffers = state.buffers;
  var bufferedLength = state.bufferedLength;
  var error = false;

  // High-order bit #1: If the request is for zero bytes, satisfy it
  // trivially. We do this before the error check, because it makes
  // sense to let such requests succeed, even in the face of a pending
  // error.
  if (length === 0) {
    this.callback(false, 0, buffer || new Buffer(0), offset);
    return true;
  }

  // High-order bit #2: If the slicer is in an error state and there's
  // nothing to read first, report the error.
  if ((bufferedLength === 0) && (state.error !== consts.NO_ERROR)) {
    this.callback(true, 0, buffer || new Buffer(0), offset);
    return true;
  }

  // Figure out how much to read, at most, returning if it turns
  // out the read() can't complete.

  if (typ.isUndefined(length)) {
    length = bufferedLength;
  }

  if (buffer) {
    length = Math.min(length, buffer.length - this.offset);
  }

  if (length > bufferedLength) {
    if (!force) {
      // Not enough data for this read() to trigger.
      return false;
    }
    // We're being forced; just read what's available.
    length = bufferedLength;
    error = true;
  }

  // Copy the right amount out of the pending buffers.

  if (!buffer) {
    buffer = new Buffer(length);
    offset = 0;
  }

  var origOffset = offset; // for callback and to figure out the final length
  var endOffset = offset + length;

  while ((offset < endOffset) && (bufferedLength > 0)) {
    var one = buffers[0];
    var oneLength = buffers[0].length;

    if (oneLength <= length) {
      // Consume the entire pending buffer, since the read() wants
      // at least that much.
      one.copy(buffer, offset);
      buffers.shift();
    } else {
      // Copy just what's needed to satisfy the read(), and slice()
      // the remainder to be ready for the next request.
      one.copy(buffer, offset, 0, length);
      buffers[0] = one.slice(length);
      oneLength = length;
    }

    offset += oneLength;
    length -= oneLength;
    bufferedLength -= oneLength;
  }

  state.bufferedLength = bufferedLength; // Write back modified value.
  this.callback(error, endOffset - origOffset, buffer, origOffset);
  return true;
}