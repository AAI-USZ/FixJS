function(e) {
      if(e) return cb(new Error(str+'. Couldn\'t clean up after error: '+e.message));
      cb(new Error(str+'. Removed globally used version'));
    }