function(value, cb) {
      if (typeof value === 'function') {
        switch (value.length) {
          case 0:
            return cb(null, value());
          case 1:
            return value(cb);
        }
      } else {
        return cb(null, value);
      }
    }