function(sequence) {
    var buffer;
    if (!(sequence instanceof Uint8Array)) {
      buffer = extractBuffer(sequence);
      if (!buffer) {
        throw new TypeError('Cannot write ' + sequence + ', not a sequence');
      }
      sequence = new Uint8Array(buffer);
    }
    if (sequence.byteLength > this.available) {
      throw new Error('Cannot write ' + sequence + ' using ' + sequence.byteLength + ' byte(s), ' + this.available + ' available');
    }
    this._raw.set(sequence, this._index);
    this._index += sequence.byteLength;
    return this;
  }