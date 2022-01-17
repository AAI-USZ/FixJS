function() {
    if (sawSIGINT) {
      rli.pause();
      process.exit();
    }

    rli.line = '';

    if (!(self.bufferedCommand && self.bufferedCommand.length > 0) &&
        rli.line.length === 0) {
      rli.output.write('\n(^C again to quit)\n');
      sawSIGINT = true;
    } else {
      rli.output.write('\n');
    }

    self.bufferedCommand = '';
    self.displayPrompt();
  }