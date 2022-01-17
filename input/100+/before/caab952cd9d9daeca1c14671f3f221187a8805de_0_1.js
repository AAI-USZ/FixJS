function(cursor) {
    var cmd = this;
    var replacedFragment = cmd.replacedFragment;

    cmd.createBlocks();
    cmd.jQize();
    if (replacedFragment) {
      replacedFragment.adopt(cmd.firstChild, 0, 0);
      replacedFragment.jQ.appendTo(cmd.firstChild.jQ);
    }

    cursor.jQ.before(cmd.jQ);

    cursor.prev = cmd.adopt(cursor.parent, cursor.prev, cursor.next);

    //adjust context-sensitive spacing
    cmd.respace();
    if (cmd.next)
      cmd.next.respace();
    if (cmd.prev)
      cmd.prev.respace();

    cmd.placeCursor(cursor);

    cmd.bubble('redraw');
  }