function resetMatchedElement() {
  if (matchedElement) {
    $(matchedElement).css('background-color', originalBgColor);
    $(matchedElement).unbind('click.annotator');
  }
}