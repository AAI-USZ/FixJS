function(e) {// clean up
        if(e) return _cb(new Error(err.message+'. Couldn\'t clean after error: '+e.message));
        _cb(err);// pass on error
      }