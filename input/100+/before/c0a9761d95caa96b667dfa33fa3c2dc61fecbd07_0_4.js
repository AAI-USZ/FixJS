function emulate(version, args, cb) {
  var n = this;
  var source = this.sourceDir+'/'+version+'.exe';
  var run = function(err, real_version) {
    if(err) return cb(err);
    
    source = n.sourceDir+'/'+real_version+'.exe';
    var node = exec(source, args, {
      stdio: 'inherit',
      cwd: path.resolve('.')
    });
    // onexit: cb(err=null, code)
    node.on('exit', cb.bind(n, null));
  }
  
  // fetch source if it doesn't exist
  if(!fs.existsSync(source)) {
    this.fetch(version, source, run);
    return;
  }
  
  return run();
}