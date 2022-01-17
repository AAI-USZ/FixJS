function checkCaret(adjustment){
    var node, text,
    range = selection.getRangeAt(0),
    rangeIsCollapsed = range.collapsed;

    function checkSibling(property, collapse){
      while(!node[property]){
        node = node.parentNode;
      }
      node = node[property];
      if(node && !/br|h\d|p/i.test(node.nodeName)){
        if(rangeIsCollapsed){
          selectNodes([node], collapse);
        } else { // Fix a Firefox bug: double click on a bold word
          // overextends the start of the selection outside the bold tag
          if(collapse){
            range.setStartBefore(node.firstChild);
          }
          selection.removeAllRanges();
          selection.addRange(range);
        }
        return false;
      }
    }

    node = range.startContainer;
    if(node.nodeType == 3){ // Its a textnode
      text = node.nodeValue;
      if(range.startOffset + adjustment === 0 && /^ /.test(text)){
        return checkSibling('previousSibling', false);
      } else if(range.startOffset + adjustment === node.length && / $/.test(text)){
        return checkSibling('nextSibling', true);
      }
    }
  }