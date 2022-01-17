function listen(self, address, port, addressType) {
  if (process.env.NODE_WORKER_ID) {
    require('cluster')._getServer(address, port, addressType, function(handle) {
      self._handle = handle;
      self._listen2(address, port, addressType);
    });
  } else {
    self._listen2(address, port, addressType);
  }
}