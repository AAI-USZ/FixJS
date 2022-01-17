function (node, elem, content, move) {
    if (elem.isRoot) throw new Error('can not insert content at beforebegin on root element');

    // get positions and size
    var insert = elem.pos.beforeend + elem.pos.afterend + 1;

    // remove content from document
    replaceContent(node, insert, insert, content);

    // move all next siblings to this element
    moveParentSiblings(elem, move);

    // insert elements intro the document tree
    if (node.document.liveParsing === true) {
      var parent = elem.parent;
      insertElements(parent, parent.childrens.indexOf(elem) + 1, insert, content);
    }
  }