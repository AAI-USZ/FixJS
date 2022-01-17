function emulate(version, args, cb) {
  var n = this;
  var source = this.sourceDir+'/'+version+'.exe';
  
  var run = function(err, real_version) {
    if(err) return cb(err);
    
    var node = exec(n.sourceDir+'/'+real_version+'.exe', args, {
      stdio: 'inherit',
      cwd: path.resolve('.')
    });
    // onexit: cb(err=null, code)
    node.on('exit', cb.bind(n, null));
  }
  
  fs.exists(source, function(exists) {
    if(!exists) return n.fetch(version, source, run);
    run(null, version);
  });
}