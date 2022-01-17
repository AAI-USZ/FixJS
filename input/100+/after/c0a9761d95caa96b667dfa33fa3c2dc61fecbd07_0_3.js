function(exists) {
    if(exists) {
      n.checkout(source, function(err) {
        if(err) return cb(err);
        cb(null, version);
      });
      return;
    }
  
    n.fetch(version, source, function(err, real_version) {
      if(err) {
        return cb(err);
      }
      
      n.checkout(n.sourceDir+'/'+real_version+'.exe', function(err) {
        if(err) return cb(err);
        cb(null, real_version);
      });
    });
  }