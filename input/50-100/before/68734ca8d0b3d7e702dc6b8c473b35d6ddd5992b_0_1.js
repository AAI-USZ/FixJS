function(exitCode) {
      if (joe.exited) {
        return;
      }
      joePrivate.exited = true;
      joe.report('exit');
      if (typeof process !== "undefined" && process !== null) {
        if (exitCode == null) {
          exitCode = joe.hasErrors() ? 1 : 0;
        }
        process.exit(exitCode);
      }
      return this;
    }