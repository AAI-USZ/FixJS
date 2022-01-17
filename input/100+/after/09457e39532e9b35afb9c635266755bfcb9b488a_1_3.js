function charIdxInLine(cm, cHar, motion_options) {
    // Search for cHar in line.
    // motion_options: {forward, inclusive}
    // If inclusive = true, include it too.
    // If forward = true, search forward, else search backwards.
    // If char is not found on this line, do nothing
    var cur = cm.getCursor(), line = cm.getLine(cur.line), idx;
    var ch = toLetter(cHar), mo = motion_options;
    if (mo.forward) {
      idx = line.indexOf(ch, cur.ch + 1);
      if (idx != -1 && mo.inclusive) idx += 1;
    } else {
      idx = line.lastIndexOf(ch, cur.ch);
      if (idx != -1 && !mo.inclusive) idx += 1;
    }
    return idx;
  }