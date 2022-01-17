function(args, duration) {
      var desc, flag, inclVal, key, option, value;
      var _this = this;
      if (duration == null) duration = 0;
      if (!(args != null)) {
        args = [];
        for (key in WASH_ARGS) {
          value = WASH_ARGS[key];
          if (!(this[key] != null)) continue;
          flag = value[0], option = value[1], desc = value[2], inclVal = value[3];
          if (this[key] || inclVal) args.push(flag);
          if (inclVal) args.push(this[key]);
        }
      }
      this.stop();
      if (duration > 0) {
        this.proc = void 0;
        return exec('wash', args, function(output) {
          var line, _i, _len, _ref2, _results;
          _ref2 = output.split('\n');
          _results = [];
          for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
            line = _ref2[_i];
            _results.push(_this.process(line));
          }
          return _results;
        });
      } else {
        this.proc = spawn('wash', args);
        this.proc.stdout.on('data', this.process);
        return this.proc.stderr.on('data', this.process);
      }
    }