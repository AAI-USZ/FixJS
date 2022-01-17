function () {
    log.debug("Leaving scope: " + CA.joinedScope);
    CA.RealtimeTransport.leaveScope(CA.joinedScope);
    delete CA.joinedScope;
  }