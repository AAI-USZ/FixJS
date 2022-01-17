function() {
  if (this._hadError) return;

  if (this._processing || this._paused) return;

  if (this._queue.length === 0) {
    if (this._needDrain) {
      this._needDrain = false;
      this.emit('drain');
    }
    // nothing to do, waiting for more data at this point.
    return;
  }

  var req = this._queue.shift();
  var cb = req.pop();
  var chunk = req.pop();

  if (this._ending && this._queue.length === 0) {
    this._flush = binding.Z_FINISH;
  }

  var self = this;
  var availInBefore = chunk && chunk.length;
  var availOutBefore = this._chunkSize - this._offset;

  var inOff = 0;
  var req = this._binding.write(this._flush,
                                chunk, // in
                                inOff, // in_off
                                availInBefore, // in_len
                                this._buffer, // out
                                this._offset, //out_off
                                availOutBefore); // out_len

  req.buffer = chunk;
  req.callback = callback;
  this._processing = req;

  function callback(availInAfter, availOutAfter, buffer) {
    if (self._hadError) return;

    var have = availOutBefore - availOutAfter;

    assert(have >= 0, 'have should not go down');

    if (have > 0) {
      var out = self._buffer.slice(self._offset, self._offset + have);
      self._offset += have;
      self.emit('data', out);
    }

    // XXX Maybe have a 'min buffer' size so we don't dip into the
    // thread pool with only 1 byte available or something?
    if (availOutAfter === 0 || self._offset >= self._chunkSize) {
      availOutBefore = self._chunkSize;
      self._offset = 0;
      self._buffer = new Buffer(self._chunkSize);
    }

    if (availOutAfter === 0) {
      // Not actually done.  Need to reprocess.
      // Also, update the availInBefore to the availInAfter value,
      // so that if we have to hit it a third (fourth, etc.) time,
      // it'll have the correct byte counts.
      inOff += (availInBefore - availInAfter);
      availInBefore = availInAfter;

      var newReq = self._binding.write(self._flush,
                                       chunk,
                                       inOff,
                                       availInBefore,
                                       self._buffer,
                                       self._offset,
                                       self._chunkSize);
      newReq.callback = callback; // this same function
      newReq.buffer = chunk;
      self._processing = newReq;
      return;
    }

    // finished with the chunk.
    self._processing = false;
    if (cb) cb();
    self._process();
  }
}