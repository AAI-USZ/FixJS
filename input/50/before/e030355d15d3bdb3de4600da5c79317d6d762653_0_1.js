function(change) {
      if (suppress) return;
      applyToShareJS(editorDoc, change.data, doc);
      return check();
    }