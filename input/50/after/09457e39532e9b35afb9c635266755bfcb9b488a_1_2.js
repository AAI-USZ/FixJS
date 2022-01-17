function(cm) {
      cm.setCursor(cm.getCursor().line, cm.getCursor().ch-1, true);
      cm.setOption("keyMap", "vim");
    }