function findMarkdownHereWrappersInRange(range) {
  var documentFragment, cloneWrappers, wrappers, selection, i;

  // Finding elements in a range isn't very simple...

  documentFragment = range.cloneContents();

  cloneWrappers = documentFragment.querySelectorAll('.markdown-here-wrapper');

  if (cloneWrappers && cloneWrappers.length > 0) {
    // Now we have an array of *copies* of the wrappers in the DOM. Find them in
    // the DOM from their IDs. This is why we need unique IDs for our wrappers.
    wrappers = [];
    for (i = 0; i < cloneWrappers.length; i++) {
      wrappers.push(range.commonAncestorContainer.ownerDocument.getElementById(cloneWrappers[i].id));
    }

    return wrappers;
  }
  else {
    return null;
  }
}