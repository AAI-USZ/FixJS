function (elem, content, move) {
    // get positions and size
    var before = after = elem.pos.beforebegin + elem.pos.afterbegin;

    // remove content from document
    replaceContent(this, before, after, content);

    // update all other tags (both start and end) there are to follow
    // move the end tag
    elem.pos.beforebegin += move;
    elem.pos.beforeend += move;
    moveChildPointers(elem, move);
  }