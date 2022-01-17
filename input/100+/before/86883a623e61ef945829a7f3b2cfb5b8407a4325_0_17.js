function selectWordAt(pos) {
      var line = getLine(pos.line).text;
      var start = pos.ch, end = pos.ch;
      while (start > 0 && isWordChar(line.charAt(start - 1))) --start;
      while (end < line.length && isWordChar(line.charAt(end))) ++end;
      setSelectionUser({line: pos.line, ch: start}, {line: pos.line, ch: end});
    }