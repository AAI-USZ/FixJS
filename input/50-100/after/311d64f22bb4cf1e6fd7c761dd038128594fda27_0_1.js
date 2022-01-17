function (err, collection) {
      if (err) {
        return callback(err);
      }

      var myOptions = options;
      options.safe = true;
      collection.save(document, myOptions, function (error, result) {
        collection.findOne({"_id": document._id}, function (error, item) {
          callback(error, item);
        });
      });
    }