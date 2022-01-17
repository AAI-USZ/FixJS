function (err, files) {
    if (err) {
      // Since we couldn't find the directory we need to pass it to addDir
      haibu.emit('repo:dir:notfound', 'warn', { 
        app: self.app.name, 
        dir: self.appDir,
        user: self.app.user
      });
      
      err.blame = {
        type: 'system',
        message: 'Cannot find application directories'
      }
      
      return callback(err, false);
    }
    else if (files.length === 0) {
      haibu.emit('repo:dir:empty', 'warn', { 
        app: self.app.name, 
        user: self.app.user,
        dir: self.appDir
      });
      
      err = new Error('Application directory is empty');
      err.blame = {
        type: 'user',
        message: 'Repository local directory empty'
      }
      
      return callback(err);
    }

    // Now that we know the home directory, set it on the app managed by this repository
    var sourceDir = path.join(self.appDir, files[0]),
        firstNonDot = files.filter(function (f) { return f[0] !== '.' });
    
    self._setHome(firstNonDot[0]);

    haibu.emit('repo:dir:exists', 'info', { 
      app: self.app.name, 
      user: self.app.user,
      dir: sourceDir 
    });
    
    callback(null, true);
  }