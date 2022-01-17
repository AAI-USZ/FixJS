function(cm) {
      emptyBuffer();
      mark["Shift-D"] = cm.getCursor(false).line;
      cm.setCursor(cm.getCursor(true).line);
      yankTillMark(cm,"Shift-D"); mark = [];
    }