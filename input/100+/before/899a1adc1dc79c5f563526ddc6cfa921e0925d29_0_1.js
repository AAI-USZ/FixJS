function spawn (repo, callback) {
  if (!(repo instanceof haibu.repository.Repository)) {
    var err = new Error('Error spawning drone: no repository defined');
    err.blame = {
      type: 'user',
      message: 'Repository configuration'
    }
    return callback();
  }

  var self = this,
      app  = repo.app,
      meta = { app: app.name, user: app.user },
      script = repo.startScript,
      result,
      responded = false,
      stderr = [],
      stdout = [],
      options = [],
      foreverOptions,
      carapaceBin,
      error,
      drone;

  haibu.emit('spawn:setup', 'info', meta);
  
  try {
    var spawnOptions = haibu.getSpawnOptions(app);
  }
  catch (e) {
    return callback(e);
  }

  foreverOptions = {
    fork:      true,
    silent:    true,
    cwd:       repo.homeDir,
    hideEnv:   haibu.config.get('hideEnv'),
    env:       spawnOptions.env,
    forkShim:  spawnOptions.forkShim,
    minUptime: this.minUptime,
    command:   spawnOptions.command,
    options:   [spawnOptions.carapaceBin].concat(options)
  };
  //
  // Concatenate the `argv` of any plugins onto the options
  // to be passed to the carapace script.
  //
  Object.keys(haibu.plugins).forEach(function (plugin) {
    var spawn;

    if (haibu.plugins[plugin].argv) {
      haibu.emit('plugin:argv', 'info', {
        app: app.name,
        user: app.user,
        plugin: plugin
      });

      spawn = haibu.plugins[plugin].argv(repo);

      if (spawn.script) {
        script = spawn.script
      }

      if (spawn.argv) {
        foreverOptions.options = foreverOptions.options.concat(spawn.argv);
      }
    }
  });

  foreverOptions.forever = typeof self.maxRestart === 'undefined';
  if (typeof self.maxRestart !== 'undefined') {
    foreverOptions.max = self.maxRestart;
  }

  //
  // Before we attempt to spawn, let's check if the startPath actually points to a file
  // Trapping this specific error is useful as the error indicates an incorrect
  // scripts.start property in the package.json
  //
  fs.stat(repo.startScript, function (err, stats) {
    if (err) {
      var err = new Error('package.json error: ' + 'can\'t find starting script: ' + repo.app.scripts.start);
      err.blame = {
        type: 'user',
        message: 'Package.json start script declared but not found'
      }
      return callback(err);
    }

    foreverOptions.options.push(script);
    carapaceBin = foreverOptions.options.shift();
    drone = new forever.Monitor(carapaceBin, foreverOptions);
    drone.on('error', function () {
      //
      // 'error' event needs to be caught, otherwise
      // the haibu process will die
      //
    });

    haibu.emit(['spawn', 'begin'], 'info', {
      options: foreverOptions.options.join(' '),
      app: meta.app,
      user: meta.user,
      drone: drone,
      pkg: app
    });

    //
    // Log data from `drone.stdout` to haibu
    //
    function onStdout (data) {
      data = data.toString();
      haibu.emit('drone:stdout', 'info', data, meta);

      if (!responded) {
        stdout = stdout.concat(data.split('\n').filter(function (line) { return line.length > 0 }));
      }
    }

    //
    // Log data from `drone.stderr` to haibu
    //
    function onStderr (data) {
      data = data.toString();
      haibu.emit('drone:stderr', 'error', data, meta);

      if (!responded) {
        stderr = stderr.concat(data.split('\n').filter(function (line) { return line.length > 0 }));
      }
    }

    //
    // If the `forever.Monitor` instance emits an error then
    // pass this error back up to the callback.
    //
    // (remark) this may not work if haibu starts two apps at the same time
    //
    function onError (err) {
      if (!responded) {
        errState = true;
        responded = true;
        callback(err);

        //
        // Remove listeners to related events.
        //
        drone.removeListener('exit', onExit);
        drone.removeListener('message', onCarapacePort);
      }
    }

    //
    // When the carapace provides the port that the drone
    // has bound to then respond to the callback
    //
    function onCarapacePort (info) {
      if (!responded && info && info.event === 'port') {
        responded = true;
        result.socket = {
          host: self.host,
          port: info.data.port
        };
        
        drone.minUptime = 0;

        haibu.emit('drone:port', 'info', {
          pkg: app,
          info: info
        });
        
        callback(null, result);
        
        //
        // Remove listeners to related events
        //
        drone.removeListener('exit', onExit);
        drone.removeListener('error', onError);
      }
    }

    //
    // When the drone starts, update the result for monitoring software
    //
    function onChildStart (monitor, data) {
      result = {
        monitor: monitor,
        process: monitor.child,
        data: data,
        pid: monitor.childData.pid,
        pkg: app
      };

      haibu.emit(['drone', 'start'], 'info', {
        process: result.process,
        pkg: result.pkg
      });
    }

    //
    // When the drone stops, update the result for monitoring software
    //
    function onChildRestart (monitor, data) {
      haibu.emit(['drone', 'stop'], 'info', {
        process: result.process,
        pkg: result.pkg
      });
      
      haibu.emit(['drone', 'start'], 'info', {
        process: data,
        pkg: result.pkg
      });
    }

    //
    // If the drone exits prematurely then respond with an error
    // containing the data we receieved from `stderr`
    //
    function onExit () {
      if (!responded) {
        errState = true;
        responded = true;
        error = new Error('Error spawning drone');
        error.blame = {
          type: 'user',
          message: 'Script prematurely exited'
        }
        error.stdout = stdout.join('\n');
        error.stderr = stderr.join('\n');
        callback(error);

        //
        // Remove listeners to related events.
        //
        drone.removeListener('error', onError);
        drone.removeListener('message', onCarapacePort);
      }
    }

    //
    // Listen to the appropriate events and start the drone process.
    //
    drone.on('stdout', onStdout);
    drone.on('stderr', onStderr);
    drone.once('exit', onExit);
    drone.once('error', onError);
    drone.once('start', onChildStart);
    drone.on('restart', onChildRestart);
    drone.on('message', onCarapacePort);
    drone.start();
  });
}