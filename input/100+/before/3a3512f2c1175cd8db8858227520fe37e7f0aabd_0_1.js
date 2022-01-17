function checkCaret(adjustment){
    var range = selection.getRangeAt(0),node, text;
    function checkSibling(property, collapse){
      while(!node[property]){
        node = node.parentNode;
      }
      node = node[property];
      if(node && !/br|h\d|p/i.test(node.nodeName)){
        selectNodes([node], collapse);
        return false;
      }
    }
    if(range.collapsed){
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
  }