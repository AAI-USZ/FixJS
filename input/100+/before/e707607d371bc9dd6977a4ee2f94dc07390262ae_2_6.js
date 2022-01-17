function(event) {
    var event = event || window.event;
    var element = this;
    element.holdMouse = null;
    element.onmousemove = null;
    revertResizableBlock();
    removeMobileElement();
    Self.enableDragDrop = null;
    document.onselectstart = function(){return true};
    
    var mask = gj(element).find("div.Mask:first")[0];
    addStyle(mask, {width: "0px", height: "0px", top: "0px", left: "0px", border: "none"});
    //collect item
    var item = null;
    for(var i in Self.allItems) {
      if (Array.prototype[i]) continue;
      item = Self.allItems[i];
      if (item.selected && !inArray(Self.itemsSelected, item)) Self.itemsSelected.push(item);
    }
    //show context menu
    var rightClick = (event.which && event.which > 1) || (event.button && event.button == 2);
    if (rightClick) Self.showGroundContextMenu(event, element);
  }