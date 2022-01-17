function(err) {
  if (this._ended) {
    return;
  }

  this._ended = true;
  var self    = this;
  var args    = arguments;

  if (err) {
    this._addLongStackTrace(err);
  }


  // Escape stack (so try..catch in Protocol#write does not interfer here)
  process.nextTick(function() {
    if (err) {
      self.emit('error', err);
    }

    if (self._callback) {
      self._callback.apply(self, args);
    }

    self.emit('end');
  });
}