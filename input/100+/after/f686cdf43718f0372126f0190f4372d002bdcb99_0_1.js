function spawnNpm (err) {
    try {
      var spawnOptions = haibu.getSpawnOptions(target);
    }
    catch (e) {
      callback(e);
      return;
    }
    args = [
      '-u',
      haibu.config.get('useraccounts:prefix') + target.user,
      'npm',
      // package.json scripts freak out from node-pack in some versions, sudo -u + this are workaround
      '--unsafe-perm', 'true',
      //only use cache for app
      '--cache', path.join(dir,'..','.npm'),
      //use blank or non-existent user config
      '--userconfig', path.join(dir,'..','.userconfig'),
      //use non-existant user config
      '--globalconfig', path.join(dir,'..','.globalconfig'),
      'install'
    ];
    
    haibu.emit('npm:install:args', 'info', { args: args })
    spawnOptions.cwd = dir;
    child = spawn('sudo', args, spawnOptions);
    
    //
    // Kill NPM if this takes more than 5 minutes
    //
    setTimeout(child.kill.bind(child, 'SIGKILL'), 5 * 60 * 1000);
    
    child.stdout.on('data', function (data) {
      haibu.emit('npm:install:stdout', 'info', {
        data: data+'',
        meta: meta
      });
    });

    child.stderr.on('data', function (data) {
      stderr += data;
      haibu.emit('npm:install:stderr', 'info', {
        data: data+'',
        meta: meta
      });
    });

    child.on('exit', function (code) {
      if (code || code == null) {
        var err = new Error('NPM Install failed');
        err.code = code;
        err.result = stderr;
        err.blame = {
          type: 'user',
          message: 'NPM failed to install dependencies'
        };

        haibu.emit('npm:install:failure', 'info', {
          code: code,
          meta: meta
        });

        callback(err);
        return;
      }

      haibu.emit('npm:install:success', 'info', meta);
      callback();
    });
  }