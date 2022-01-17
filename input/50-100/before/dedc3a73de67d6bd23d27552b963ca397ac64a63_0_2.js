function (node, elem, content) {
    // get positions and size
    var insert = elem.pos.beforeend + elem.pos.afterend + 1;

    // remove content from document
    replaceContent(node, insert, insert, content);
  }