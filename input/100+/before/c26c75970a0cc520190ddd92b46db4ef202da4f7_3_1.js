function initializeCollection(name, createOptions) {
  var promise = new p.Promise();

  mongo.collection( name, {safe: true}, function(err, result) {
    if (err) {

      // Collection does not exist, create it
      mongo.createCollection( name, createOptions.options, function(err, collection) {

        if (err) {
          promise.reject(err);
        } else {

          // Created the collection, does it need an initial value set?
          if (createOptions.value) {

            collection.insert( createOptions.value, { safe: true }, function(err)  {

              if (err) {
                promise.reject(err);
              } else {
                // Successfully added the initial values
                promise.resolve();
              }

            });

          } else {
          // No initial value required
            promise.resolve();
          }
        }
      });

    } else {
    // Collection already created
      promise.resolve();
    }
  });

  return promise;
}