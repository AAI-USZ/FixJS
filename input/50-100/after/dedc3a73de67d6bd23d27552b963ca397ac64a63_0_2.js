function (node, elem, content) {
    if (elem.isRoot) throw new Error('can not insert content at beforebegin on root element');

    // get positions and size
    var insert = elem.pos.beforeend + elem.pos.afterend + 1;

    // remove content from document
    replaceContent(node, insert, insert, content);
  }