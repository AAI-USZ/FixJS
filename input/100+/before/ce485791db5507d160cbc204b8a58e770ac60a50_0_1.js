function(s, key) {
  var next_word, next_non_word, previous_word, previous_non_word;
  key = key || {};

  if (key.ctrl && key.shift) {
    /* Control and shift pressed */
    switch (key.name) {
      case 'backspace':
        this._deleteLineLeft();
        break;

      case 'delete':
        this._deleteLineRight();
        break;
    }

  } else if (key.ctrl) {
    /* Control key pressed */

    switch (key.name) {
      case 'c':
        if (this.listeners('SIGINT').length) {
          this.emit('SIGINT');
        } else {
          // default behavior, end the readline
          this._attemptClose();
        }
        break;

      case 'h': // delete left
        this._deleteLeft();
        break;

      case 'd': // delete right or EOF
        if (this.cursor === 0 && this.line.length === 0) {
          this._attemptClose();
        } else if (this.cursor < this.line.length) {
          this._deleteRight();
        }
        break;

      case 'u': // delete the whole line
        this.cursor = 0;
        this.line = '';
        this._refreshLine();
        break;

      case 'k': // delete from current to end of line
        this._deleteLineRight();
        break;

      case 'a': // go to the start of the line
        this.cursor = 0;
        this._refreshLine();
        break;

      case 'e': // go to the end of the line
        this.cursor = this.line.length;
        this._refreshLine();
        break;

      case 'b': // back one character
        if (this.cursor > 0) {
          this.cursor--;
          this._refreshLine();
        }
        break;

      case 'f': // forward one character
        if (this.cursor != this.line.length) {
          this.cursor++;
          this._refreshLine();
        }
        break;

      case 'n': // next history item
        this._historyNext();
        break;

      case 'p': // previous history item
        this._historyPrev();
        break;

      case 'z':
        process.kill(process.pid, 'SIGTSTP');
        return;

      case 'w': // delete backwards to a word boundary
      case 'backspace':
        this._deleteWordLeft();
        break;

      case 'delete': // delete forward to a word boundary
        this._deleteWordRight();
        break;

      case 'backspace':
        this._deleteWordLeft();
        break;

      case 'left':
        this._wordLeft();
        break;

      case 'right':
        this._wordRight();
    }

  } else if (key.meta) {
    /* Meta key pressed */

    switch (key.name) {
      case 'b': // backward word
        this._wordLeft();
        break;

      case 'f': // forward word
        this._wordRight();
        break;

      case 'd': // delete forward word
      case 'delete':
        this._deleteWordRight();
        break;

      case 'backspace': // delete backwards to a word boundary
        this._deleteWordLeft();
        break;
    }

  } else {
    /* No modifier keys used */

    switch (key.name) {
      case 'enter':
        this._line();
        break;

      case 'backspace':
        this._deleteLeft();
        break;

      case 'delete':
        this._deleteRight();
        break;

      case 'tab': // tab completion
        this._tabComplete();
        break;

      case 'left':
        if (this.cursor > 0) {
          this.cursor--;
          this.output.moveCursor(-1, 0);
        }
        break;

      case 'right':
        if (this.cursor != this.line.length) {
          this.cursor++;
          this.output.moveCursor(1, 0);
        }
        break;

      case 'home':
        this.cursor = 0;
        this._refreshLine();
        break;

      case 'end':
        this.cursor = this.line.length;
        this._refreshLine();
        break;

      case 'up':
        this._historyPrev();
        break;

      case 'down':
        this._historyNext();
        break;

      default:
        if (Buffer.isBuffer(s))
          s = s.toString('utf-8');

        if (s) {
          var lines = s.split(/\r\n|\n|\r/);
          for (var i = 0, len = lines.length; i < len; i++) {
            if (i > 0) {
              this._line();
            }
            this._insertString(lines[i]);
          }
        }
    }
  }
}