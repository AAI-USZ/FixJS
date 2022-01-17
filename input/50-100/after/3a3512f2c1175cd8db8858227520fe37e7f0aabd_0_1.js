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