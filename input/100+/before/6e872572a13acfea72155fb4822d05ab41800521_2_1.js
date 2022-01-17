function(err, length) {
    if (err) {
      callback(err);
    } else {
      var object = defaultValues;
      object.id = length + 1; // ids are 1-indexed

      var value = JSON.stringify(object);
      db.hset(key, String(object.id), value, function(err, status) {
        if (err) {
          callback(err);
        } else if (!status) {
          callback(new Error('Object already exists in database; ' +
            "It's value was updated instead of added."));
        } else {
          callback(null, object);
        }
      });
    }
  }