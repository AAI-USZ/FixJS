function () {
    var scopeId = $('#scopeIdInput').val();
    log.debug("[CA] = Joining scope with id; " + scopeId);
    CA.ownClientId = _genRandomUserId();
    log.debug("[CA] = Generated client id: " + CA.ownClientId);
    CA.RealtimeTransport.joinScope(scopeId, CA.ownClientId);
    CA.joinedScope = scopeId;
  }