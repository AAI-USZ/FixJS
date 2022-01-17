function(err, real_version) {
    if(err) return cb(err);
    
    var node = exec(n.sourceDir+'/'+real_version+'.exe', args, {
      stdio: 'inherit',
      cwd: path.resolve('.')
    });
    // onexit: cb(err=null, code)
    node.on('exit', cb.bind(n, null));
  }