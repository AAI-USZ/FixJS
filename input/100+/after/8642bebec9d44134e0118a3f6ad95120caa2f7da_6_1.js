function onConnection (socket) {
    // inbounds sockets can not reconnect by definition
    options.reconnect = false;
    connectionListener(new NsSocket(options, socket));
  }