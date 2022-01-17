function unlink(version, cb) {
  var n = this;
  var source  = this.sourceDir+'/'+version+'.exe';
  
  // delete source if it exists
  if(fs.existsSync(source)) {
    return fs.unlink(source, cb);
  }
  
  return cb();
}