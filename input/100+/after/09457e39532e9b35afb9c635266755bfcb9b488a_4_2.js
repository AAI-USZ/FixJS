function(cm, line, hideEnd) {
  var lineText = cm.getLine(line), at = lineText.length, startChar, tokenType;
  for (;;) {
    var found = lineText.lastIndexOf("{", at);
    if (found < 0) break;
    tokenType = cm.getTokenAt({line: line, ch: found}).className;
    if (!/^(comment|string)/.test(tokenType)) { startChar = found; break; }
    at = found - 1;
  }
  if (startChar == null || lineText.lastIndexOf("}") > startChar) return;
  var count = 1, lastLine = cm.lineCount(), end;
  outer: for (var i = line + 1; i < lastLine; ++i) {
    var text = cm.getLine(i), pos = 0;
    for (;;) {
      var nextOpen = text.indexOf("{", pos), nextClose = text.indexOf("}", pos);
      if (nextOpen < 0) nextOpen = text.length;
      if (nextClose < 0) nextClose = text.length;
      pos = Math.min(nextOpen, nextClose);
      if (pos == text.length) break;
      if (cm.getTokenAt({line: i, ch: pos + 1}).className == tokenType) {
        if (pos == nextOpen) ++count;
        else if (!--count) { end = i; break outer; }
      }
      ++pos;
    }
  }
  if (end == null || end == line + 1) return;
  if (hideEnd === true) end++;
  return end;
}