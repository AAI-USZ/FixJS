function finish(e, ret) {

      self.memory(cmd);

      // If error was SyntaxError and not JSON.parse error
      if (isSyntaxError(e)) {
        if (cmd.trim().match(/^npm /) && !self.bufferedCommand) {
          self.outputStream.write('npm should be run outside of the ' +
                                  'node repl, in your normal shell.\n' +
                                  '(Press Control-D to exit.)\n');
          self.bufferedCmd = '';
          self.displayPrompt();
          return;
        }

        // Start buffering data like that:
        // {
        // ...  x: 1
        // ... }
        self.bufferedCommand += cmd + '\n';
        self.displayPrompt();
        return;
      } else if (e) {
        self.outputStream.write((e.stack || e) + '\n');
      }

      // Clear buffer if no SyntaxErrors
      self.bufferedCommand = '';

      // If we got any output - print it (if no error)
      if (!e && (!self.ignoreUndefined || ret !== undefined)) {
        self.context._ = ret;
        self.outputStream.write(self.writer(ret) + '\n');
      }

      // Display prompt again
      self.displayPrompt();
    }