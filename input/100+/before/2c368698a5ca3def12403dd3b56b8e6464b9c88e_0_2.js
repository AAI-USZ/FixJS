function(err, count) {
    // We got an error (f.ex not authorized)
    if(err != null) return callback(err, null);
    // If no users don't call getlast error
    if(count == 0) safe = false;
    // Check if the user exists and update i
    collection.find({user: username}, {dbName: options['dbName']}).toArray(function(err, documents) {
      // We got an error (f.ex not authorized)
      if(err != null) return callback(err, null);
      // We have a user, let's update the password
      if(documents.length > 0) {
        collection.update({user: username},{user: username, pwd: userPassword}, {safe:safe, dbName: options['dbName']}, function(err, results) {
          callback(err, documents);
        });
      } else {
        collection.insert({user: username, pwd: userPassword}, {safe:safe, dbName: options['dbName']}, function(err, documents) {
          callback(err, documents);
        });
      }
    });
  }