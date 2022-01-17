function(
    selection, reversed) {
  if (!reversed || this.isCollapsed()) {
    // The base implementation for select() is more robust, and works fine for
    // collapsed and forward ranges.  This works around
    // https://bugzilla.mozilla.org/show_bug.cgi?id=773137, and is tested by
    // range_test.html's testFocusedElementDisappears.
    goog.base(this, 'selectInternal', selection, reversed);
  } else {
    // Reversed selection -- start with a caret on the end node, and extend it
    // back to the start.  Unfortunately, collapse() fails when focus is
    // invalid.
    selection.collapse(this.getEndNode(), this.getEndOffset());
    selection.extend(this.getStartNode(), this.getStartOffset());
  }
}