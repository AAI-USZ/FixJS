function() {
      var commands, nodeunit, _this = this;
      info("" + "running command".cyan.bold + ": " + opts.run.bold);
      commands = opts.run.split(/\s+/);
      nodeunit = spawn(commands.shift(), commands);
      nodeunit.stderr.setEncoding("utf8");
      nodeunit.stderr.on("data", function(data) {
        return error(data.replace(/^\s*/, "").replace(/\s*$/, ""));
      });
      nodeunit.stdout.setEncoding("utf8");
      nodeunit.stdout.on("data", function(data) {
        return info(data.replace(/^\s*/, "").replace(/\s*$/, ""));
      });
      return nodeunit.on("exit", function(code) {
        info("complete running command".cyan.bold);
        return _this.next();
      });
    }