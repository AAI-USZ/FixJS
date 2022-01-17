function(err, result) {
      if (err && typeof callback === "function") return callback(err);
    self.moveTo(result.value.ELEMENT, function(err, result) {
        if (err && typeof callback === "function") {
          return callback(err);
        }else {
          callback(null, result);
      }
    });
  }