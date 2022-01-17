function (options) {
    options || (options = {});
    options.racer = this;
    // TODO Provide full configuration for socket.io
    var store = new Store(options)
      , sockets, listen;
    if (sockets = options.sockets) {
      store.setSockets(sockets, options.socketUri);
    } else if (listen = options.listen) {
      store.listen(listen, options.namespace);
    }
    return store;
  }