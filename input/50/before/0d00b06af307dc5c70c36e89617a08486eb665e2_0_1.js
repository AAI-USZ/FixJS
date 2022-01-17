function proxyError (err) {
    reverseProxy.end();
    if (self.emit('webSocketProxyError', req, socket, head)) {
      return;
    }

    socket.end();
  }