function (node, elem, content, move) {
    if (elem.singleton) throw new Error('can not insert content intro singleton element');

    // get positions and size
    var insert = elem.pos.beforeend;

    // remove content from document
    replaceContent(node, insert, insert, content);

    // Update the end tag
    elem.pos.beforeend += move;
  }