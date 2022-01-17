function() {
    self.emit('end');
    if (cb) cb();
  }