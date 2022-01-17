function(evt) {
	eval("var event = ''");
    event = evt || window.event;
    var element = this;
    Self.enableDragDrop = null;
    document.onmousemove = null;
    revertResizableBlock();
    var rightClick = (event.which && event.which > 1) || (event.button && event.button == 2);
    var leftClick = !rightClick;
    if (leftClick) {
      if(Self.rootNode == element){
        delete Self.rootNode;
        return ;
      }
      var mobileElement = document.getElementById(Self.mobileId);
      if (mobileElement && mobileElement.move && element.temporary) {
        //post action
        /*var actionArea = document.getElementById("UIWorkingArea");
        var moveAction = DOM.findFirstDescendantByClass(actionArea, "div", "JCRMoveAction");
        var wsTarget = element.getAttribute('workspacename');
        var idTarget = element.getAttribute('objectId');
        
        //Dunghm: check symlink
        var regex = new RegExp("^"+idTarget);
        if(regex.test(Self.srcPath)){
          delete Self.srcPath;
          return ;
        }
        if (eXo.ecm.UITimelineView.enableDragAndDrop == "true") {
          if(event.ctrlKey && event.shiftKey)
            Self.postGroupAction(moveAction.getAttribute("symlink"), "&destInfo=" + wsTarget + ":" + idTarget);
          else
            Self.postGroupAction(moveAction, "&destInfo=" + wsTarget + ":" + idTarget);
        }*/
      } else {
        if (event.ctrlKey && !element.selected) {
          element.selected = true;
          //for select use shilf key;
          Self.temporaryItem = element;
          Self.itemsSelected.push(element);
          //Dunghm: Check Shift key
          element.setAttribute("isLink",null);
          if(event.shiftKey) element.setAttribute("isLink",true);
        } else if(event.ctrlKey && element.selected) {
          element.selected = null;
          element.setAttribute("isLink",null);
          element.style.background = "none";
          removeItem(Self.itemsSelected, element);
        } else if (event.shiftKey) {
          //use shift key to select;
          //need clear temporaryItem when mousedown in ground;
          var lowIndex = 0;
          var heightIndex = element.storeIndex;
          if (Self.temporaryItem) {
            lowIndex = Math.min(Self.temporaryItem.storeIndex,  element.storeIndex);
            heightIndex = Math.max(Self.temporaryItem.storeIndex,  element.storeIndex);
          }
          resetArrayItemsSelected();
          for (var i = lowIndex; i <= heightIndex; i++) {
            Self.allItems[i].selected = true;
            //Dunghm: Check Shift key
            element.setAttribute("isLink",null);
            if(event.ctrlKey) element.setAttribute("isLink",true);
            Self.itemsSelected.push(Self.allItems[i]);
          }
        } else {
          Self.clickItem(event, element);
        }
        for(var i in Self.itemsSelected) {
          if (Array.prototype[i]) continue;
          Self.itemsSelected[i].style.background = Self.colorSelected;
          //eXo.core.Browser.setOpacity(Self.itemsSelected[i], 100);
        }
      }
    } else {
      event.cancelBubble = true;
      if (inArray(Self.itemsSelected, element) && Self.itemsSelected.length > 1){
        Self.showItemContextMenu(event, element);
      } else {
        Self.clickItem(event, element);
        eval(element.getAttribute("mousedown"));
      }
    }
  }