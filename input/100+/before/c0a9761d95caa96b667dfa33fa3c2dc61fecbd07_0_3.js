function deploy(version, cb) {
  var n = this;
  var source = this.sourceDir+'/'+version+'.exe';
  
  // checkout source if it exists
  if(fs.existsSync(source)) {
    return this.checkout(source, function(err) {
      if(err) return cb(err);
      cb(null, version);
    });
  }
  
  // fetch build online
  this.fetch(version, source, function(err, real_version) {
    if(err) {
      return cb(err);
    }
    
    n.checkout(n.sourceDir+'/'+real_version+'.exe', function(err) {
      if(err) return cb(err);
      cb(null, real_version);
    });
  });
}