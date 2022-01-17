function delTillMark(cm, cHar) { 
    var i = mark[cHar], l = cm.getCursor().line, start = i > l ? l : i, end = i > l ? i : l;
    cm.setCursor(start);
    for (var c = start; c <= end; c++) {
      pushInBuffer("\n"+cm.getLine(start)); 
      cm.removeLine(start);
    }
  }