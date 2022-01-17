function(err) {
    fs.unlink(n.target, function(e) {
      if(e) return cb(new Error(err.msg+'. Couldn\'t clean up globally used version ('+e.message+')'));
      cb(new Error(err.message));
    });
  }