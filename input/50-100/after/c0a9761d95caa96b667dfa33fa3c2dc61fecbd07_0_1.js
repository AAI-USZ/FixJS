function(e) {// clean up
        if(e) return _cb(new Error(err.message+'. Couldn\'t clean up local copy of '+version));
        _cb(err);// pass on error
      }