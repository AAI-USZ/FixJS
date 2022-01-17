function setText(text) {
    if (this.getText() === text) {
      return;
    }
    /* TODO: What to do with caret? */
    this.tbox.val(text);
  }