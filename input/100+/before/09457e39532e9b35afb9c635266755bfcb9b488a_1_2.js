function joinLineNext(cm) {
    var cur = cm.getCursor(), ch = cur.ch, line = cm.getLine(cur.line);
    CodeMirror.commands.goLineEnd(cm); 
    if (cur.line != cm.lineCount()) {
      CodeMirror.commands.goLineEnd(cm);
      cm.replaceSelection(" ", "end");
      CodeMirror.commands.delCharRight(cm);
    } 
  }