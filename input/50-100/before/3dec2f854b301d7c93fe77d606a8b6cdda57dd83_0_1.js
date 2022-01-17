function() {
      var cmEditor, cmLine;
      if (!chrome.isOpen()) {
        this.open();
      }
      chrome.switchToPanel(fb.currentContext, "console");
      cmLine = cmd.getSingleRowCommandLine();
      cmEditor = cmd.getCommandEditor();
      return (fb.commandEditor ? cmEditor : cmLine).select();
    }