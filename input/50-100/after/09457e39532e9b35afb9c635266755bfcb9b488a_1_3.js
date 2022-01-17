function goLineStartText(cm) {
    // Go to the start of the line where the text begins, or the end for whitespace-only lines
    var cur = cm.getCursor(), firstNonWS = cm.getLine(cur.line).search(/\S/);
    cm.setCursor(cur.line, firstNonWS == -1 ? line.length : firstNonWS, true);
  }