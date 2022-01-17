function(err, conn) {
    if (err) error = err;
    else {
      connection = conn;
      if (!pendingStmt && queue[0]) {
        var next = queue.shift();
        run(next);
      }
    }
    callbacks();
  }