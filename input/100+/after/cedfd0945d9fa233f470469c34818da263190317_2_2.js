function Process(name, command, options) {
      this.name = name;
      this.command = command;
      if (options == null) {
        options = {};
      }
      this.cwd = options.cwd;
    }