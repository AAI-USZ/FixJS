function exec(executablePath, options, callback) {
    if (!checkType([
      "executablePath", executablePath, "string",
      "options", options, "object",
    ], callback)) return;
    spawn(executablePath, options, function(err, meta) {
      if (err) return callback(err);

      var stdout = [];
      var stderr = [];

      meta.process.stdout.on("data", function(data) { stdout.push(data); });
      meta.process.stderr.on("data", function(data) { stderr.push(data); });

      meta.process.on("exit", function(code, signal) {
        var err = null;
        stdout = stdout.join("").trim();
        stderr = stderr.join("").trim();

        if (code || signal) {
          err = new Error("process died");
          if (signal) {
            err.message += " because of signal " + signal;
            err.signal = signal;
          }
          if (code) {
            err.message += " with exit code " + code;
            err.exitCode = code;
          }
          if (stdout) {
            err.message += "\n" + stdout;
            err.stdout = stdout;
          }
          if (stderr) {
            err.message += "\n" + stderr;
            err.stderr = stderr;
          }
          return callback(err, stdout, stderr);
        }

        callback(err, stdout, stderr);
      });
    });
  }