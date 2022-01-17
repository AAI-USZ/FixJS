function(sequence) {
    var buffer, view;
    if (!(sequence instanceof Uint8Array)) {
      buffer = extractBuffer(sequence);
      if (!buffer) {
        throw new TypeError('Cannot write ' + sequence + ', not a sequence');
      }
      view = new Uint8Array(buffer);
    } else {
      view = sequence;
    }
    if (view.byteLength > this.available) {
      throw new Error('Cannot write ' + sequence + ' using ' + view.byteLength + ' byte(s), ' + this.available + ' available');
    }
    this._raw.set(view, this._index);
    this._index += view.byteLength;
    return this;
  }