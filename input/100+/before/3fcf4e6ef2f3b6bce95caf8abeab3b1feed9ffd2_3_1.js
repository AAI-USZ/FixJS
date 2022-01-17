function pressedEnter(htmlDiv){
    if(checkIfDeletedAll(htmlDiv,13) === false){
      return false;
    }
    var lastSibling = true, node, range, endContainer,
    block = currentNodes.block;

    if(/h[1-5]/i.test(block.nodeName)){ // only headings
      range = selection.getRangeAt(0);
      node = endContainer = range.endContainer;

      // only the last sibling
      while(node.parentNode !== htmlDiv[0]){
        if(node.nextSibling){
          lastSibling = false;
          break;
        }
        node = node.parentNode;
      }
      
      if(lastSibling
         && range.endOffset === endContainer.textContent.length // at
         // the end
        ){
        node = $("<p>").insertAfter(block);
        selectNodes(node);
        return false;
      }
    }
  }