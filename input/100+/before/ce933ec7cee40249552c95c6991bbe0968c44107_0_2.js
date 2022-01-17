function run(stmt) {
    checkState();
    pendingStmt = true;
    if (connection !== null) {
      if (!stmt[1])
        stmt[1] = undefined;
      wrapper.execute(connection, stmt[0], stmt[1], function(err, innerCursor) {
        pendingStmt = false;
        if (err) { 
          error = err;
          queue = null;
          self.close();
        } else if (queue[0]) {
          // clear stack before running the next statement
          var next = queue.shift();
          process.nextTick(function() {
            run(next);
          });
        }
        var resolver = stmt[2];
        if (resolver instanceof events.EventEmitter)
          resolver.emit('resolve', err, innerCursor);
        callbacks();
      });
    }
  }