function (node, elem, content, move) {
    if (elem.singleton) throw new Error('can not insert content intro singleton element');

    // get positions and size
    var insert = elem.pos.beforebegin + elem.pos.afterbegin + 1;

    // remove content from document
    replaceContent(node, insert, insert, content);

    // update all other tags (both start and end) there are to follow
    // move the end tag
    elem.pos.beforeend += move;
    moveChildPointers(elem, move);
  }