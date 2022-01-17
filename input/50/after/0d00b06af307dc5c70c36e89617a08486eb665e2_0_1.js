function proxyError (err) {
    reverseProxy.destroy();

    process.nextTick(function () {
      //
      // Destroy the incoming socket in the next tick, in case the error handler
      // wants to write to it.
      //
      socket.destroy();
    });

    self.emit('webSocketProxyError', req, socket, head);
  }