function(cn, instance, callback) {
  var self = this;
  if(!self.connectedPzp.hasOwnProperty(self.sessionId)) {
    log.info("connected to pzh & authenticated");

    self.state = global.states[2];
    self.mode = global.modes[1];

    self.connectedPzh[self.config.pzhId] = instance;
    self.pzpAddress = instance.socket.address().address;
    self.tlsId[self.sessionId] = instance.getSession();

    instance.socket.setKeepAlive(true, 100);
    self.rpcHandler.setSessionId(self.sessionId);
    setupMessageHandler(self);

    var msg = self.messageHandler.registerSender(self.sessionId, self.config.pzhId);
    self.sendMessage(msg, self.config.pzhId);

    var localServices = self.rpcHandler.getRegisteredServices();
    self.prepMsg(self.sessionId, self.config.pzhId, "registerServices", localServices);
    log.info("sent msg to register local services with pzh");
    
    var server = new pzpServer();
    server.startServer(self, function() {
      // The reason we send to PZH is because PZH acts as a point of synchronization for connecting PZP"s
      self.prepMsg(self.sessionId, self.config.pzhId, "pzpDetails", global.pzpServerPort);
      self.pzptlsServerState = global.states[2];
      callback.call(self, "startedPZP");
    });
  }
}