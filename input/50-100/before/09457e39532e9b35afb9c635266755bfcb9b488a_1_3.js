function(cm) {
      var fn = CodeMirror.commands.findNext;
      if (fn) sdir != "r" ? fn(cm) : CodeMirror.commands.findPrev(cm);
    }