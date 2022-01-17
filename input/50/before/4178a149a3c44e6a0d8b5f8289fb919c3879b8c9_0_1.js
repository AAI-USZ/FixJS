function(obj, callback) {
        if (obj.date) { callback(null, obj.date); }
        else { callback("Article has no date.") }
      }