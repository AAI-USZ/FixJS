function(address, port, addressType, backlog, fd) {
  var self = this;
  var r = 0;

  // If there is not yet a handle, we need to create one and bind.
  // In the case of a server sent via IPC, we don't need to do this.
  if (!self._handle) {
    self._handle = createServerHandle(address, port, addressType, fd);
    if (!self._handle) {
      process.nextTick(function() {
        self.emit('error', errnoException(errno, 'listen'));
      });
      return;
    }
  }

  self._handle.onconnection = onconnection;
  self._handle.owner = self;

  // Use a backlog of 512 entries. We pass 511 to the listen() call because
  // the kernel does: backlogsize = roundup_pow_of_two(backlogsize + 1);
  // which will thus give us a backlog of 512 entries.
  r = self._handle.listen(backlog || 511);

  if (r) {
    self._handle.close();
    self._handle = null;
    process.nextTick(function() {
      self.emit('error', errnoException(errno, 'listen'));
    });
    return;
  }

  // generate connection key, this should be unique to the connection
  this._connectionKey = addressType + ':' + address + ':' + port;

  process.nextTick(function() {
    self.emit('listening');
  });
}