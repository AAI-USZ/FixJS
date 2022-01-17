function(shell) {
      var login;
      login = "login -qf " + process.env.LOGNAME + " " + shell;
      return exec("" + login + " -l -c " + (quote(command)), function(err, stdout, stderr) {
        if (err) {
          return exec("" + login + " -c " + (quote(command)), callback);
        } else {
          return callback(null, stdout, stderr);
        }
      });
    }