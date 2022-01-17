function (elem, content, move) {
    if (elem.singleton) throw new Error('can not insert content intro singleton element');

    // get positions and size
    var before = after = elem.pos.beforebegin + elem.pos.afterbegin;

    // remove content from document
    replaceContent(this, before, after, content);

    // update all other tags (both start and end) there are to follow
    // move the end tag
    elem.pos.beforeend += move;
    moveChildPointers(elem, move);
  }