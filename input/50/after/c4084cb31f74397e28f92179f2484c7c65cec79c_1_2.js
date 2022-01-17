function(err) {
          if(err) return _cb(new Error('Couldn\'t rename fetched executable: '+err.message+'. Please run `nodist - latest` before you try again'));
          _cb(null, real_version);
        }