function(had_error) {
    self._reset();
    self.debug('Connection forcefully closed.');
    self.emit('close', had_error);
  }