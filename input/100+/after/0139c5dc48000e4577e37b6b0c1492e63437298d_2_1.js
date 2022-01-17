function insertText(index, insertion) {
    /* Check for null operation. */
    if (!insertion) {
      return;
    }

    /* Since the underlying widget does not separate text mutation from caret
     * movement, we must remember the current caret location and restore it
     * after changing the text. */
    var pos = this.getCaret();

    /* TODO: Abstract into String.splice. */
    var text = this.getText();
    ASSERT(index >= 0 && index <= text.length,
      "out-of-bounds index");
    var before = text.slice(0, index), after = text.slice(index);
    this.tbox.val(before + insertion + after);

    /* If the caret was past the insertion point, we must adjust it by the
     * length of the insertion. */
    if (pos > index) {
      pos += insertion.length;
    }
    this.setCaret(pos);
  }