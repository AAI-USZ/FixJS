function() {
    self._reset();
    self.debug('FIN packet received. Disconnecting...');
    self.emit('end');
  }