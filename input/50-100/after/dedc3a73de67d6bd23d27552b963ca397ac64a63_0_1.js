function (node, elem, content, move) {
    if (elem.isRoot) throw new Error('can not insert content at beforebegin on root element');

    // get positions and size
    var insert = elem.pos.beforebegin;

    // remove content from document
    replaceContent(node, insert, insert, content);

    // update all other tags (both start and end) there are to follow
    // move the end tag
    elem.pos.beforebegin += move;
    elem.pos.beforeend += move;
    moveChildPointers(elem, move);
  }