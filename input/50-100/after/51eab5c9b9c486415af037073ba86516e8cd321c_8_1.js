function(err, result) {
    if (err && typeof callback === 'function') return callback(err);
        self.elementIdCssProperty(result.value.ELEMENT, cssProperty, function(err, result) {
          if (err && typeof callback === "function") return callback(err);
            if (typeof callback === 'function') {
              callback(null, result.value);
            }
          });
    }