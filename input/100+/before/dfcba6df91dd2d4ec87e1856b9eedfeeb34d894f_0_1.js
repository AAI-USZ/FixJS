function(
    selection, reversed) {
  var anchorNode = reversed ? this.getEndNode() : this.getStartNode();
  var anchorOffset = reversed ? this.getEndOffset() : this.getStartOffset();
  var focusNode = reversed ? this.getStartNode() : this.getEndNode();
  var focusOffset = reversed ? this.getStartOffset() : this.getEndOffset();

  selection.collapse(anchorNode, anchorOffset);
  if (anchorNode != focusNode || anchorOffset != focusOffset) {
    selection.extend(focusNode, focusOffset);
  }
}