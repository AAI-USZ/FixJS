function(message) {
    // If pool connection is already closed
    if(server._serverState === 'disconnected') return;
    // Set server state to disconnected
    server._serverState = 'disconnected';
    // If we have a callback return the error
    if(typeof callback === 'function') {
      // ensure no callbacks get called twice
      var internalCallback = callback;
      callback = null;
      // Perform callback
      internalCallback(new Error(message && message.err ? message.err : message), null);
    } else if(server.isSetMember()) {
      if(server.listeners("error") && server.listeners("error").length > 0) server.emit("error", new Error(message && message.err ? message.err : message), server);
    } else {
      if(eventReceiver.listeners("error") && eventReceiver.listeners("error").length > 0) eventReceiver.emit("error", new Error(message && message.err ? message.err : message), server);
    }

    // If we are a single server connection fire errors correctly
    if(!server.isSetMember()) {
      // Fire all callback errors
      _fireCallbackErrors(server, new Error(message && message.err ? message.err : message));
      // Emit error
      _emitAcrossAllDbInstances(server, eventReceiver, "error", new Error(message && message.err ? message.err : message), server, true);
    }
  }