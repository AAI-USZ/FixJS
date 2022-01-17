function(editorDoc, delta, doc) {
    var delLen, i, startPos;
    startPos = 0;
    i = 0;
    while (i < delta.from.line) {
      startPos += editorDoc.lineInfo(i).text.length + 1;
      i++;
    }
    startPos += delta.from.ch;
    if (delta.to.line === delta.from.line && delta.to.ch === delta.from.ch) {
      doc.insert(startPos, delta.text.join('\n'));
    } else {
      delLen = delta.to.ch - delta.from.ch;
      while (i < delta.to.line) {
        delLen += editorDoc.lineInfo(i).text.length + 1;
        i++;
      }
      doc.del(startPos, delLen);
      if (delta.text) doc.insert(startPos, delta.text.join('\n'));
    }
    if (delta.next) return applyToShareJS(editorDoc, delta.next, doc);
  }