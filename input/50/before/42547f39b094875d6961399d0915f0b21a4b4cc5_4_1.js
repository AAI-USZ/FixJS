function(api) {
    if (options.forward_writes && wsapis[api].writes_db) return;
    describeOperation(api, wsapis[api]);
  }