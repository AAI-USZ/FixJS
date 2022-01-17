function leaveScope(scopeId) {
    log.debug("[RT] = Leaving scope with id: " + scopeId);
    socket.emit('leaveScope', scopeId);
  }