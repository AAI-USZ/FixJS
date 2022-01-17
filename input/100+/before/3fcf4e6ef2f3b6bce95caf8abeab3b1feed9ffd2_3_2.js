function pressedBackspace(mode, htmlDiv, editor){
    if(checkIfDeletedAll(htmlDiv,8) === false){
      return false;
    }
    var children, atBeginningOfLI,
    inFirstSibling = true,
    block = currentNodes.block,
    list = currentNodes.list,
    prev = (list || block).previousSibling,
    range = selection.getRangeAt(0),
    node = range.startContainer;

    if(!range.collapsed || !prev || range.startOffset !== 0){
      return true;
    }

    // only the first sibling
    while(node.parentNode !== htmlDiv[0]){
      if(node.previousSibling){
        inFirstSibling = false;
        if(/li/i.test(node.nodeName)){
          atBeginningOfLI = true;
        } else {
          return true;
        }
        break;
      }
      node = node.parentNode;
    }

    if(inFirstSibling){
      if(list){
        node = node.firstChild;
      }
      node = $(node);
      children = node.contents();

      $(prev).append(children);
      node.remove();
      selectNodes([children[0]], true);
    } else if(list && atBeginningOfLI){
      disableList(editor,mode);
    }
    
    return false;
  }