function remove(version, cb) {
  var n = this;
  var source  = this.sourceDir+'/'+version+'.exe';
  
  fs.exists(source, function(exists) {
    if(exists) return fs.unlink(source, cb);
    cb();// don't cry if it doesn't exist
  });
}