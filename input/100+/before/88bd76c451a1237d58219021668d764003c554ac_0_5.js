function() {
    // If pool connection is already closed
    if(server._serverState === 'disconnected') return;
    // Set server state to disconnected
    server._serverState = 'disconnected';
    // If we have a callback return the error
    if(typeof callback == 'function') {
      // ensure no callbacks get called twice
      var internalCallback = callback;
      callback = null;
      // Perform callback
      internalCallback(new Error("connection closed"), null);
    } else if(server.isSetMember()) {
      if(server.listeners("close") && server.listeners("close").length > 0) server.emit("close", new Error("connection closed"), server);
    } else {
      if(eventReceiver.listeners("close") && eventReceiver.listeners("close").length > 0) eventReceiver.emit("close", new Error("connection closed"), server);
    }

    // If we are a single server connection fire errors correctly
    if(!server.isSetMember()) {
      // Fire all callback errors
      _fireCallbackErrors(server, new Error("connection closed"));
      // Emit error
      _emitAcrossAllDbInstances(server, eventReceiver, "close", server, null, true);
    }
  }