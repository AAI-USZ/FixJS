function findMarkdownHereWrapper(focusedElem) {
  var selection, range, wrapper = null, match, i;

  selection = focusedElem.ownerDocument.getSelection();

  if (selection.rangeCount < 1) {
    return null;
  }

  range = selection.getRangeAt(0);

  wrapper = range.commonAncestorContainer;
  while (wrapper) {
    match = false;
    for (i = 0; wrapper.attributes && i < wrapper.attributes.length; i++) {
      if (wrapper.attributes[i].value === 'markdown-here-wrapper') {
        match = true;
        break;
      }
    }

    if (match) break;

    wrapper = wrapper.parentNode;
  }

  return wrapper;
}