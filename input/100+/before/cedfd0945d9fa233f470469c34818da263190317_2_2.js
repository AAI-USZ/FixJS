function() {
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
    }