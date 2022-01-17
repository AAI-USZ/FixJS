function raw (mode) {
    var setRawMode = stdin.setRawMode || process.stdin.setRawMode;
    setRawMode.call(stdin, mode);
  }