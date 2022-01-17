function joinScope(scopeId, clientId) {
    log.debug("Joining scope with id: " + scopeId);
    socket.emit('joinScope', {scopeId:scopeId, clientId:clientId});
  }