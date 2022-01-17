function moveToWord(cm, regexps, dir, times, where) {
    var cur = cm.getCursor();

    for (var i = 0; i < times; i++) {
      var line = cm.getLine(cur.line), startCh = cur.ch, word;
      while (true) {
        // If we're at start/end of line, start on prev/next respectivly
        if (cur.ch == line.length && dir > 0) {
          cur.line++;
          cur.ch = 0;
          line = cm.getLine(cur.line);
        } else if (cur.ch == 0 && dir < 0) {
          cur.line--;
          cur.ch = line.length;
          line = cm.getLine(cur.line);
        }
        if (!line) break;

        // On to the actual searching
        word = findWord(line, cur.ch, dir, regexps);
        cur.ch = word[where == "end" ? "to" : "from"];
        if (startCh == cur.ch && word.from != word.to) cur.ch = word[dir < 0 ? "from" : "to"];
        else break;
      }
    }
    return cur;
  }