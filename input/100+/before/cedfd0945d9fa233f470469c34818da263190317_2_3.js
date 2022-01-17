function() {

    __extends(Process, EventEmitter);

    function Process(name, command, options) {
      this.name = name;
      this.command = command;
      if (options == null) options = {};
      this.cwd = options.cwd;
    }

    Process.prototype.spawn = function() {
      var env, key, value, _ref;
      env = {};
      _ref = process.env;
      for (key in _ref) {
        value = _ref[key];
        env[key] = value;
      }
      if (this.port) env['PORT'] = this.port;
      env['PS'] = "" + this.name + ".1";
      return this.child = spawn('/bin/sh', ['-c', this.command], {
        env: env,
        cwd: this.cwd
      });
    };

    Process.prototype.kill = function(callback) {
      if (this.child) {
        if (callback) this.child.once('exit', callback);
        return this.child.kill('SIGKILL');
      } else {
        return typeof callback === "function" ? callback() : void 0;
      }
    };

    Process.prototype.terminate = function(callback) {
      if (this.child) {
        if (callback) this.child.once('exit', callback);
        return this.child.kill('SIGTERM');
      } else {
        return typeof callback === "function" ? callback() : void 0;
      }
    };

    Process.prototype.quit = function(callback) {
      if (this.child) {
        if (callback) this.child.once('exit', callback);
        return this.child.kill('SIGQUIT');
      } else {
        return typeof callback === "function" ? callback() : void 0;
      }
    };

    return Process;

  }