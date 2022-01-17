function () {
    var scopeId = $('#scopeIdInput').val();
    log.debug("Joining scope with id; " + scopeId);
    CA.RealtimeTransport.joinScope(scopeId, 'some details');
    CA.joinedScope = scopeId;
  }