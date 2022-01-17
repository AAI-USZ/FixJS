function(err, reply) {
    // ensure no callbacks get called twice
    var internalCallback = callback;
    callback = null;
    // If something close down the connection and removed the callback before
    // proxy killed connection etc, ignore the erorr as close event was isssued
    if(err != null && internalCallback == null) return;
    // Internal callback
    if(err != null) return internalCallback(err, null);
    server.master = reply.documents[0].ismaster == 1 ? true : false;
    server.connectionPool.setMaxBsonSize(reply.documents[0].maxBsonObjectSize);
    // Set server as connected
    server.connected = true;
    // Save document returned so we can query it
    server.isMasterDoc = reply.documents[0];
    // If we have it set to returnIsMasterResults
    if(returnIsMasterResults) {
      internalCallback(null, reply);
    } else {
      internalCallback(null, dbInstance);
    }
  }