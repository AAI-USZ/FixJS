function CLI(args, mockBang) {
      this.bang = mockBang || new Bang;
      this.program = new Command;
      this.program.version(package.version, "-v, --version").usage("[options] [key] [value]").option("-d, --delete", "delete the specified key").option("-h, --help", "get help").parse(args);
    }