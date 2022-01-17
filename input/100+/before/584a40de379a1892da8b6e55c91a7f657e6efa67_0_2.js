function(command, callback) {
    var user;
    user = process.env.LOGNAME;
    return getUserShell(function(shell) {
      return exec("login -qf " + user + " " + shell + " -l -c '" + command + "'", function(err, stdout, stderr) {
        if (err) {
          return exec("login -qf " + user + " " + shell + " -c '" + command + "'", function(err, stdout, stderr) {
            return callback(err, stdout, stderr);
          });
        } else {
          return callback(null, stdout, stderr);
        }
      });
    });
  }