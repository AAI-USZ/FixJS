function moveToWord(cm, regexps, dir, where) {
    var cur = cm.getCursor(), ch = cur.ch, line = cm.getLine(cur.line), word;
    while (true) {
      word = findWord(line, ch, dir, regexps);
      ch = word[where == "end" ? "to" : "from"];
      if (ch == cur.ch && word.from != word.to) ch = word[dir < 0 ? "from" : "to"];
      else break;
    }
    cm.setCursor(cur.line, word[where == "end" ? "to" : "from"], true);
  }