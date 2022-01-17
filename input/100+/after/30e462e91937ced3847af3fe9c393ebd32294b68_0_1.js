function listen(self, address, port, addressType) {
  if (!process.env.NODE_WORKER_ID) {
    self._listen2(address, port, addressType);
    return;
  }

  require('cluster')._getServer(address, port, addressType, function(handle) {
    // OS X doesn't necessarily signal EADDRINUSE from bind(), it may defer
    // the error until later. libuv mimics this behaviour to provide
    // consistent behaviour across platforms but that means we could very
    // well have a socket that is not actually bound... that's why we do
    // this ghetto port check and raise EADDRINUSE if the requested and the
    // actual port differ except if port == 0 because that means "any port".
    if (port && port != handle.getsockname().port) {
      self.emit('error', errnoException('EADDRINUSE', 'bind'));
      return;
    }

    self._handle = handle;
    self._listen2(address, port, addressType);
  });
}