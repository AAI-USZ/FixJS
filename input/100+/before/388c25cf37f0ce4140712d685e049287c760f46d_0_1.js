function(key, e) {
    switch (key) {
    case 'Ctrl-Shift-Backspace':
    case 'Ctrl-Backspace':
      while (this.cursor.prev || this.cursor.selection) {
        this.cursor.backspace();
      }
      break;

    case 'Shift-Backspace':
    case 'Backspace':
      this.cursor.backspace();
      break;

    // Tab or Esc -> go one block right if it exists, else escape right.
    case 'Esc':
    case 'Tab':
      var parent = this.cursor.parent;
      // cursor is in root editable, continue default
      if (parent === this.cursor.root) return;

      if (parent.next) {
        // go one block right
        this.cursor.prependTo(parent.next);
      } else {
        // get out of the block
        this.cursor.insertAfter(parent.parent);
      }

      this.cursor.clearSelection();
      break;

    // Shift-Tab -> go one block left if it exists, else escape left.
    case 'Shift-Tab':
      var parent = this.cursor.parent;
      //cursor is in root editable, continue default
      if (parent === this.cursor.root) return;

      if (parent.prev) {
        // go one block left
        this.cursor.appendTo(parent.prev);
      } else {
        //get out of the block
        this.cursor.insertBefore(parent.parent);
      }

      this.cursor.clearSelection();
      break;

    // Prevent newlines from showing up
    case 'Enter': break;


    // End -> move to the end of the current block.
    case 'End':
      this.cursor.clearSelection().appendTo(this.cursor.parent);
      break;

    // Ctrl-End -> move all the way to the end of the root block.
    case 'Ctrl-End':
      this.cursor.clearSelection().appendTo(this);
      break;

    // Shift-End -> select to the end of the current block.
    case 'Shift-End':
      while (this.cursor.next) {
        this.cursor.selectRight();
      }
      break;

    // Ctrl-Shift-End -> select to the end of the root block.
    case 'Ctrl-Shift-End':
      while (this.cursor.next || this.cursor.parent !== this) {
        this.cursor.selectRight();
      }
      break;

    // Home -> move to the start of the root block or the current block.
    case 'Home':
      this.cursor.clearSelection().prependTo(this.cursor.parent);
      break;

    // Ctrl-Home -> move to the start of the current block.
    case 'Ctrl-Home':
      this.cursor.clearSelection().prependTo(this);
      break;

    // Shift-Home -> select to the start of the current block.
    case 'Shift-Home':
      while (this.cursor.prev) {
        this.cursor.selectLeft();
      }
      break;

    // Ctrl-Shift-Home -> move to the start of the root block.
    case 'Ctrl-Shift-Home':
      while (this.cursor.prev || this.cursor.parent !== this) {
        this.cursor.selectLeft();
      }
      break;

    case 'Left': this.cursor.moveLeft(); break;
    case 'Shift-Left': this.cursor.selectLeft(); break;
    case 'Ctrl-Left': break;

    case 'Right': this.cursor.moveRight(); break;
    case 'Shift-Right': this.cursor.selectRight(); break;
    case 'Ctrl-Right': break;

    case 'Up':
      if (this.cursor.parent.prev) {
        this.cursor.clearSelection().appendTo(this.cursor.parent.prev);
      } else if (this.cursor.prev) {
        this.cursor.clearSelection().prependTo(this.cursor.parent);
      }
      else if (this.cursor.parent !== this) {
        this.cursor.clearSelection().insertBefore(this.cursor.parent.parent);
      }
      break;

    case 'Shift-Up':
      if (this.cursor.prev) {
        while (this.cursor.prev) this.cursor.selectLeft();
      } else {
        this.cursor.selectLeft();
      }

    case 'Ctrl-Up': break;

    case 'Down':
      if (this.cursor.parent.next) {
        this.cursor.clearSelection().prependTo(this.cursor.parent.next);
      } else if (this.cursor.next) {
        this.cursor.clearSelection().appendTo(this.cursor.parent);
      } else if (this.cursor.parent !== this) {
        this.cursor.clearSelection().insertAfter(this.cursor.parent.parent);
      }
      break;

    case 'Shift-Down':
      if (this.cursor.next) {
        while (this.cursor.next) this.cursor.selectRight();
      }
      else {
        this.cursor.selectRight();
      }

    case 'Ctrl-Down': break;

    case 'Del':
      if (e.ctrlKey)
        while (this.cursor.next || this.cursor.selection)
          this.cursor.deleteForward();
      else
        this.cursor.deleteForward();
      break;

    case 'Ctrl-a':
      //so not stopPropagation'd at RootMathCommand
      if (this !== this.cursor.root) return;

      this.cursor.clearSelection().appendTo(this);
      while (this.cursor.prev) this.cursor.selectLeft();
      break;

    default:
      return false;
    }
    e.preventDefault();
    return false;
  }