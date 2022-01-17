function(err) {
        if (err && onerror) return onerror(err, cb);
        return cb(err);
      }