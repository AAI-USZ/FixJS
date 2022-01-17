function callback(availInAfter, availOutAfter, buffer) {
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