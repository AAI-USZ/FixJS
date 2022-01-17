function(err, result) {
    if (err && typeof callback === "function") return callback(err);
      self.moveTo(result.value.ELEMENT, function(err, result) {
        if (err && typeof callback === "function") return callback(err);
        self.buttonDown(function() {
          self.buttonUp(function() {
            if (typeof callback === "function") {
                callback(null, result);
              }
            })
        })
      });
    }