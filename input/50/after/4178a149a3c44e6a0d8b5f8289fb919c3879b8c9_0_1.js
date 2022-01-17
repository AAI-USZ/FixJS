function(obj, callback) {
        // callback(null, obj.date);
        if (obj.date) {
          return callback(null, obj.date);
        } else {
          console.log(obj.title);
          return callback("Article has no date.") }
      }