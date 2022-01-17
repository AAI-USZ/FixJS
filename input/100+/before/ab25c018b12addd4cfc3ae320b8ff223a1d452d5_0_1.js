function(callback) {
      var args, msg;
      if (!path.existsSync(JASMINE)) {
        msg = "" + (red("Can't find jasmine-node module")) + "\n\nRun " + (yellow('neat install')) + " to install the dependencies.";
        return typeof callback === "function" ? callback(new Error(msg)) : void 0;
      }
      args = ['.', '--color', '--coffee', '--test-dir', "" + Neat.root + "/test/spec"];
      return run(JASMINE, args, callback);
    }