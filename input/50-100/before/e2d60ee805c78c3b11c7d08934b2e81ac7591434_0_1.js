function(err, conn) {
    if (err) error = err;
    else {
      connection = conn;
      if (!pendingStmt && queue[0])
        run(queue.shift());
    }
    callbacks();
  }