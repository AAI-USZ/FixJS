function(args) {
      var desc, flag, inclVal, key, option, value;
      if (!(args != null)) {
        args = [];
        for (key in REAVER_ARGS) {
          value = REAVER_ARGS[key];
          if (!(this[key] != null)) {
            continue;
          }
          flag = value[0], option = value[1], desc = value[2], inclVal = value[3];
          if (this[key] || inclVal) {
            args.push(flag);
          }
          if (inclVal) {
            args.push(this[key]);
          }
        }
      }
      this.stop();
      this.proc = spawn('reaver', args);
      this.proc.stdout.on('data', this.process);
      return this.proc.stderr.on('data', this.process);
    }