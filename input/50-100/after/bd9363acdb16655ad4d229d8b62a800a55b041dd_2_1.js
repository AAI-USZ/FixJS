function joinAdjacentList(border, list){
    var children;
    if(border.safeBlock && border.safeBlock.nodeName === list[0].nodeName){
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