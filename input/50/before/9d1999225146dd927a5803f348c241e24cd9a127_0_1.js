function raw (mode) {
    var setRawMode = stdin.setRawMode || tty.setRawMode;
    setRawMode.call(stdin, mode);
  }