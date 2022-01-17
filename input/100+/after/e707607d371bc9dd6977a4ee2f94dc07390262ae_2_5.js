function(evt) {
	eval("var event = ''");  
    event = evt || window.event;
    var element = this;
    element.holdMouse = true;
    Self.hideContextMenu();
    Self.temporaryItem = null;
    document.onselectstart = function(){return false};
    
    var rightClick = (event.which && event.which > 1) || (event.button && event.button == 2);
    if (!rightClick && eXo.ecm.UITimelineView.objResize == null) {
      resetArrayItemsSelected();
      element.onmousemove = Self.mutipleSelect;
      var mask = gj(element).find("div.Mask:first")[0];
      mask.storeX = eXo.ecm.DMSBrowser.findMouseRelativeX(element, event);
      mask.storeY = eXo.core.Browser.findMouseRelativeY(element, event);
      addStyle(mask, {
        left: mask.storeX + "px",
        top: mask.storeY + "px",
        zIndex: 1,
        width: "0px",
        height: "0px",
        backgroundColor: "gray",
        border: "1px dotted black"
      });
      mask.style.opacity = 17/100;
      
      //store position for all item
      var listGrid = gj(element).find("div.UIListGrid:first")[0];
      for( var i = 0 ; i < Self.allItems.length; ++i) {
        Self.allItems[i].posX = Math.abs(eXo.core.Browser.findPosXInContainer(Self.allItems[i], element)) - listGrid.scrollLeft;
        Self.allItems[i].posY = Math.abs(eXo.core.Browser.findPosYInContainer(Self.allItems[i], element)) - listGrid.scrollTop;
      }
    }
  }