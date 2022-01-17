function(err, stdout, stderr) {
        if (err) {
          return exec("" + login + " -c " + (quote(command)), callback);
        } else {
          return callback(null, stdout, stderr);
        }
      }