function(ed, change) {
      if (suppress) {
        return;
      }
      applyToShareJS(editor, change, sharedoc);
      return check();
    }