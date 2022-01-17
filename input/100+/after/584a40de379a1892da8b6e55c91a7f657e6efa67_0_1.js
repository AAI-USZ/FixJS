function(script, env, options, callback) {
    var command, cwd, filename, _ref;
    if (options.call) {
      callback = options;
      options = {};
    } else {
      if (options == null) {
        options = {};
      }
    }
    cwd = path.dirname(script);
    filename = makeTemporaryFilename();
    command = "" + ((_ref = options.before) != null ? _ref : "true") + " &&\nsource " + (quote(script)) + " > /dev/null &&\nenv > " + (quote(filename));
    return getUserShell(function(shell) {
      return exec("" + shell + " -c " + (quote(command)), {
        cwd: cwd,
        env: env
      }, function(err, stdout, stderr) {
        if (err) {
          err.message = "'" + script + "' failed to load (" + shell + " -c " + (quote(command)) + ")";
          err.stdout = stdout;
          err.stderr = stderr;
          return callback(err);
        } else {
          return readAndUnlink(filename, function(err, result) {
            if (err) {
              return callback(err);
            } else {
              return callback(null, parseEnv(result));
            }
          });
        }
      });
    });
  }