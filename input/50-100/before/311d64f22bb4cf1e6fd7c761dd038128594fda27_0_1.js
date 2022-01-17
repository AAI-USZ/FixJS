function (err, collection) {
      if (err) {
        return callback(err);
      }

      collection.save(document, options, callback);
    }