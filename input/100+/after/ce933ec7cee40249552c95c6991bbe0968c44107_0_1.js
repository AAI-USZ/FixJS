function run(stmt) {
    var resolver = stmt[2];
    if (error && resolver instanceof events.EventEmitter) {
      resolver.emit('resolve', error);
      schedule();
    }
    checkState();
    pendingStmt = true;
    if (connection !== null) {
      if (!stmt[1])
        stmt[1] = undefined;
      wrapper.execute(connection, stmt[0], stmt[1], function(err, innerCursor) {
        pendingStmt = false;
        if (err) { 
          error = err;
          self.close();
        } 
        schedule();      
        if (resolver instanceof events.EventEmitter)
          resolver.emit('resolve', err, innerCursor);
        callbacks();
      });
    }
  }