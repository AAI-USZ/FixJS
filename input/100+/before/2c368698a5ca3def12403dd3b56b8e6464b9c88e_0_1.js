function(err, documents) {
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
    }