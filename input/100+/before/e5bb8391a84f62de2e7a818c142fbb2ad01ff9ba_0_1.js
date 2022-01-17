function connect(self, address, port, addressType, localAddress) {
  if (port) {
    self.remotePort = port;
  }
  self.remoteAddress = address;

  // TODO return promise from Socket.prototype.connect which
  // wraps _connectReq.

  assert.ok(self._connecting);

  if (localAddress) {
    var r;
    if (addressType == 6) {
      r = self._handle.bind6(localAddress);
    } else {
      r = self._handle.bind(localAddress);
    }

    if (r) {
      self._destroy(errnoException(errno, 'bind'));
      return;
    }
  }

  var connectReq;
  if (addressType == 6) {
    connectReq = self._handle.connect6(address, port);
  } else if (addressType == 4) {
    connectReq = self._handle.connect(address, port);
  } else {
    connectReq = self._handle.connect(address, afterConnect);
  }

  if (connectReq !== null) {
    connectReq.oncomplete = afterConnect;
  } else {
    self._destroy(errnoException(errno, 'connect'));
  }
}