function joinAdjacentList(border, list){
    var children;
    if(border.safeBlock && /ul/i.test(border.safeBlock.nodeName)){
      next = border.safeBlock[border.nextProperty];

      children = $(border.safeBlock).remove().children();
      if(border.nextProperty === 'previousSibling'){
        children.prependTo(list);
      } else {
        children.appendTo(list);
      }
      border.safeBlock = next;
    }
  }