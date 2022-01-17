function leaveScope(scopeId) {
    log.debug("Leaving scope with id: " + scopeId);
    socket.emit('leaveScope', scopeId);
  }