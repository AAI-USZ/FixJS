function Server(procfile, callback) {
      var _this = this;
      this.procfile = procfile;
      this.cwd = dirname(this.procfile);
      this.pools = {};
      parseProcfile(this.procfile, function(err, procfile) {
        var command, name;
        for (name in procfile) {
          command = procfile[name];
          _this.pools[name] = createPool(name, command, {
            cwd: _this.cwd
          });
        }
        return callback(_this);
      });
    }