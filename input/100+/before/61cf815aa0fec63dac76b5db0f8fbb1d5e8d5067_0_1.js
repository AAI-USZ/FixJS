function selectWordAt(pos) {
      var line = lines[pos.line].text;
      var start = pos.ch, end = pos.ch;
      while (start > 0 && /\w/.test(line.charAt(start - 1))) --start;
      while (end < line.length - 1 && /\w/.test(line.charAt(end))) ++end;
      setSelection({line: pos.line, ch: start}, {line: pos.line, ch: end});
    }