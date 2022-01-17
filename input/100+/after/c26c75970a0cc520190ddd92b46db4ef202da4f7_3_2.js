function(database) {
  var promise = new Promise(),
      initCounter,
      initLinks,
      initErrLog,
      initActLog;

  // Connect to the mongo database
  mongo = new m.Db(database, new m.Server('localhost', 27017, {}));

  mongo.open(function(err, result) {
    var mb = 1048576;

    if (err) {
      promise.reject(err);
    } else {

      // Create the counter collection and start the links counter at 0
      initCounter = initializeCollection('counter', {
        options: { safe: true },
        value: {tbl: 'links', c: 0}
      });

      // Create the links collection
      initLinks = initializeCollection('links', {
        options: { safe: true }
      });

      // Create the err log collection, cap it at 10 MB
      initErrLog = initializeCollection('errLog', {
        options: { safe: true, capped: true, size: mb*10 }
      });

      // Create the activity log collection, cap it at 50 MB
      initActLog = initializeCollection('actLog', {
        options: { safe: true, capped: true, size: mb*50 }
      });

      // Wait for all operations to finish
      Promise.when(initCounter, initLinks, initErrLog, initActLog).then(function() {

        // Successfully finished, resolve the promise and pass any arguments along
        promise.resolve(mongo);

      }, function(err) {

        // Failed, reject the promise and pass any arguments along
        promise.reject(err);

      });

    }
  });

  return promise;
}