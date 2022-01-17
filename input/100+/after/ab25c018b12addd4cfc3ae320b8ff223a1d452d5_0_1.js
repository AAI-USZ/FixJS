function(callback) {
      var args;
      if (!path.existsSync(JASMINE)) {
        error("" + (red("Can't find jasmine-node module")) + "\n\nRun " + (yellow('neat install')) + " to install the dependencies.");
        return typeof callback === "function" ? callback() : void 0;
      }
      args = ['.', '--color', '--coffee', '--test-dir', "" + Neat.root + "/test/spec"];
      return run(JASMINE, args, function(status) {
        return typeof callback === "function" ? callback() : void 0;
      });
    }