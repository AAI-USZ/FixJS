function() {
      var cmEditor, cmLine;
      if (!chrome.isOpen()) {
        this.open();
      }
      chrome.switchToPanel(fb.currentContext, "console");
      cmLine = cmd.getSingleRowCommandLine();
      cmEditor = cmd.getCommandEditor();
      if (fb.commandEditor) {
        return cmEditor.focus();
      } else {
        return cmLine.select();
      }
    }