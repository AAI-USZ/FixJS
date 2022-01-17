function connect(url) {
    log.debug('Subscribing on global dispatcher with url: ' + url);
    if (window['io'] === undefined) {
      // this means that we failed to load socket.io.js from NPS instance
      log.error("Socket IO undefined");
      return;
    }
    socket = io.connect(url + '/global', IO_GLOBAL_OPTS);
    socket.on('connect', function () {
      log.debug("Successfully connected");
    });
    socket.on('newClient', _onNewClient);
    socket.on('clientLeft', _onClientLeft);
    socket.on('answer', _onAnswer);
    socket.on('offer', _onOffer);
    socket.on('reconnect_failed', function () {
      log.error("Failed to reconnect to NPS");
    });
    socket.on('connect_failed', function () {
      // this error means that socket.io.js was retrieved from NPS in < script > tag,
      // but failed to connect using available transports
      log.error("Connection to NPS failed");
    });
  }