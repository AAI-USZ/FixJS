function(schemas){
    async.parallel([
      startPolling,
      function(cb){ getMeetups(schemas, cb) }
    ]);
  }