function() {
    _super.createBlocks.call(this);

    //TODO: use inheritance
    if (this.cmd === '_') {
      this.down = this.firstChild;
      this.firstChild.up = insertBeforeUnlessAtEnd;
    }
    else { pray('SupSub is only _ and ^', this.cmd === '^');
      this.up = this.firstChild;
      this.firstChild.down = insertBeforeUnlessAtEnd;
    }
    function insertBeforeUnlessAtEnd(cursor) {
      // cursor.insertBefore(cmd), unless cursor at the end of block, and every
      // ancestor cmd is at the end of every ancestor block
      var cmd = this.parent, ancestorCmd = cursor;
      do {
        if (ancestorCmd.next) {
          cursor.insertBefore(cmd);
          return false;
        }
        ancestorCmd = ancestorCmd.parent.parent;
      } while (ancestorCmd !== cmd);
      cursor.insertAfter(cmd);
      return false;
    }
  }