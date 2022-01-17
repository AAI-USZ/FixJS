function (elem, content, move) {
    // get positions and size
    var before = after = elem.pos.beforeend + elem.pos.afterend;

    // remove content from document
    replaceContent(this, before, after, content);
  }