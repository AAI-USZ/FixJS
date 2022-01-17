function(sql, params) {
    checkState();
    if (!params)
      params = undefined;
    var resolver = new events.EventEmitter()
    , stmt = [sql, params, resolver];
    queue.push(stmt);
    if (!pendingStmt && connection !== null && queue[0] === stmt)
      run(queue.shift()); 
    return new ResultPromise(resolver);
  }