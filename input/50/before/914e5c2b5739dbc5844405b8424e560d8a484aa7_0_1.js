function handleText() {
      // the two cases things might show up
      // in the textarea outside of normal
      // text input are if the user is selecting
      // text, or has just pasted.
      // TODO: make sure we're not relying on this
      // in IE < 9, since hasSelection() will always
      // be false.
      if (paste || hasSelection()) return;

      popText(textCallback);
    }