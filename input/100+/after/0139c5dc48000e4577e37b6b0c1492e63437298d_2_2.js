function removeText(begin, end) {
    /* Check for null operation. */
    if (begin === end) {
      return;
    }

    var pos = this.getCaret();

    /* TODO: Abstract into String.cut? */
    var text = this.getText();
    ASSERT(begin >= 0, "out-of-bounds begin");
    /* TODO: Should we support argument swapping? */
    ASSERT(begin < end, "begin should come before end");
    ASSERT(end <= text.length, "out-of-bounds end");
    var before = text.slice(0, begin),
      removal = text.slice(begin, end),
      after = text.slice(end);
    this.tbox.val(before + after);

    /* If the caret was past the range, we must adjust it by the length of
     * the range. If it was within the range, we move it to the beginning/end
     * of the range. */
    if (pos >= end) {
      pos -= removal.length;
    } else if (pos > begin) {
      pos = begin;
    }
    this.setCaret(pos);

    return removal;
  }