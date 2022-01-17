function (elem, content, move) {
    if (elem.singleton) throw new Error('can not insert content intro singleton element');

    // get positions and size
    var before = after = elem.pos.beforeend;

    // remove content from document
    replaceContent(this, before, after, content);

    // Update the end tag
    elem.pos.beforeend += move;
  }