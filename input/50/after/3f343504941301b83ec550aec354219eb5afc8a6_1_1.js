function(appSchemas){
    schemas = appSchemas;
    console.log("starting");
    async.parallel([
      startPolling,
      function(cb){ getMeetups(schemas, cb) }
    ]);
  }