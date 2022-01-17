function(value, cb) {
      switch (value.length) {
        case void 0:
          return cb(null, value);
        case 0:
          return cb(null, value());
        case 1:
          return value(cb);
      }
    }