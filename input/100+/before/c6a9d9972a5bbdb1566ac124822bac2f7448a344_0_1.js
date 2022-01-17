function spawn(executablePath, options, callback) {
    if (!checkType([
      "executablePath", executablePath, "string",
      "options", options, "object",
    ], callback)) return;

    var args = options.args || [];
    if (checkPermissions && fsOptions.hasOwnProperty('uid')) {
      options.uid = fsOptions.uid;
    }
    if (checkPermissions && fsOptions.hasOwnProperty('gid')) {
      options.gid = fsOptions.gid;
    }

    if (options.hasOwnProperty('env')) {
      options.env.__proto__ = fsOptions.defaultEnv;
    } else {
      options.env = fsOptions.defaultEnv;
    }

    try {
      var child = childProcess.spawn(executablePath, args, options);
    } catch (e) {
      return callback(e);
    }
    if (options.resumeStdin) child.stdin.resume();
    if (options.hasOwnProperty('stdoutEncoding')) {
      child.stdout.setEncoding(options.stdoutEncoding);
    }
    if (options.hasOwnProperty('stderrEncoding')) {
      child.stderr.setEncoding(options.stderrEncoding);
    }

    child.kill = function(signal) {
      killtree(child, signal);
    };

    callback(null, {
      process: child
    });
  }