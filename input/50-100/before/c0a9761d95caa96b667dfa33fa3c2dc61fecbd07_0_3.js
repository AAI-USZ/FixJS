function(err, real_version) {
    if(err) return cb(err);
    
    source = n.sourceDir+'/'+real_version+'.exe';
    var node = exec(source, args, {
      stdio: 'inherit',
      cwd: path.resolve('.')
    });
    // onexit: cb(err=null, code)
    node.on('exit', cb.bind(n, null));
  }