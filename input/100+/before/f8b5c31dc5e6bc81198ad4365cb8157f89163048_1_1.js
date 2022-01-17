function parse(tree) {

  // skip doctype
  var doctype = tree.content.indexOf('<!'),
      begin = tree.content.indexOf('<', doctype + 1),
      end = tree.content.lastIndexOf('>');

  var root = {
    isRoot: true,
    pos: {
      beforebegin: 0,
      afterbegin: begin - 0,
      beforeend: end,
      afterend: (tree.content.length - 1) - end
    },

    childrens: []
  };

  var pos = begin;
  var deep = [root], tag, elem, parent;

  while (true) {
    // get next tag in the document
    tag = nextTag(tree, pos);
    if (tag === null) break;
    pos = tag.end;

    // if endtag and position to element
    if (tag.isEnd) {
      elem = deep.pop();
      endTag(elem, tag);
      continue;
    }

    // create new tag
    elem = createTag(tree, tag);

    // Add element
    parent = deep.slice(-1)[0];
    elem.parent = parent;
    parent.childrens.push(elem);

    // If element should have an end tag, push it to the deep list
    if (!elem.singleton) {
      deep.push(elem);
    }
  }

  return root;
}