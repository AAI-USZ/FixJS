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

    // Thunderbird (but not Chrome) leaves class names intact quoting an email
    // that is being replied to. That means that there will be old wrappers in
    // DOM that we need to ignore when looking for wrappers to revert. Luckily,
    // the `data-md-original` attribute is not retained, so we'll require the
    // presence of both the class and the data attribute to indicate a wrapper.
    for (i = 0; wrapper.attributes && i < wrapper.attributes.length; i++) {
      if (wrapper.classList && wrapper.classList.contains('markdown-here-wrapper')
          && wrapper.attributes && wrapper.attributes.getNamedItem('data-md-original')) {
        match = true;
        break;
      }
    }

    if (match) break;

    wrapper = wrapper.parentNode;
  }

  return wrapper;
}