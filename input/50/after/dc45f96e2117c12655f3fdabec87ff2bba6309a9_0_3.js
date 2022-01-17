function() {
    self._reset();
    self.debug&&self.debug('FIN packet received. Disconnecting...');
    self.emit('end');
  }