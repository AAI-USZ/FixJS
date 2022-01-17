function(err) {
          if(err) return _cb(new Error(err.message+'. Couldn\'t rename latest. Please run `nodist - latest` and try again'));
          _cb(null, real_version);
        }