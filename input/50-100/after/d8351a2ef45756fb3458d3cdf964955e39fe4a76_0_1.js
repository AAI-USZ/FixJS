function(status, event, filename) {
    if (status) {
      self._handle.close();
      self.emit('error', errnoException(errno, 'watch'));
    } else {
      self.emit('change', event, filename);
    }
  }