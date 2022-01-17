function () {
    var scopeId = $('#scopeIdInput').val();
    log.debug("Joining scope with id; " + scopeId);
    CA.ownClientId = _genRandomUserId();
    log.debug("Generated client id: " + CA.ownClientId);
    CA.RealtimeTransport.joinScope(scopeId, CA.ownClientId);
    CA.joinedScope = scopeId;
  }