function(err, count) {
    // We got an error (f.ex not authorized)
    if(err != null) return callback(err, null);
    // Check if the user exists and update i
    collection.find({user: username}, {dbName: options['dbName']}).toArray(function(err, documents) {
      // We got an error (f.ex not authorized)
      if(err != null) return callback(err, null);
      // We have a user, let's update the password or upsert if not
      collection.update({user: username},{$set: {user: username, pwd: userPassword}}, {safe:safe, dbName: options['dbName'], upsert:true}, function(err, results) {
        if(count == 0 && err) {
          callback(null, [{user:username, pwd:userPassword}]);
        } else if(err) {
          callback(err, null)
        } else {
          callback(null, [{user:username, pwd:userPassword}]);
        }
      });
    });
  }