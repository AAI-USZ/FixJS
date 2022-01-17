function pressedDelete(mode, htmlDiv, editor){
    if(checkIfDeletedAll(htmlDiv,46) === false){
      return false;
    }
    if(!$.browser.webkit){
      return true;
    }
    var children,
    block = currentNodes.block,
    list = currentNodes.list,
    next = (list || block).nextSibling,
    range = selection.getRangeAt(0),
    node = range.startContainer;

    if(!range.collapsed || !next || range.startOffset !== node.length){
      return true;
    }

    // only the first sibling
    while(node.parentNode !== htmlDiv[0]){
      if(node.nextSibling){
        return true;
      }
      node = node.parentNode;
    }

    if(list){
      // append to last list item
      node = node.lastChild;
    }
    if(/(u|o)l/i.test(next.nodeName)){
      // swallow only the first list item
      next = next.firstChild;
    }
    next = $(next);
    children = next.contents();

    $(node).append(children);
    next.remove();

    return false;
  }