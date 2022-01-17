function() {
    this._logger.trace("addMenuItems");

    let menuPopup = document.getElementById("thumbnailzoomplus-toolbar-menu");
    if (menuPopup) {
      let menuSeparator =
        document.getElementById("thumbnailzoomplus-toolbar-menuseparator");
      let menuItem = null;
      let pageCount = ThumbnailZoomPlus.FilterService.pageList.length;
      let pageInfo = null;

      for (let i = 0; i < pageCount; i++) {
        pageInfo = ThumbnailZoomPlus.FilterService.pageList[i];
        let id = "thumbnailzoomplus-toolbar-menuitem-" + pageInfo.key;
        menuItem = document.getElementById(id);
        if (menuItem) {
          // I couldn't get Firefox to consistently update the state of
          // existing checkboxes correctly, so instead we always
          // delete and recreate checkboxes when re-showing the menu.
          menuPopup.removeChild(menuPopup.firstChild);
        } 
        // Item doesn't exist so create it.
        menuItem = document.createElement("menuitem");
        menuItem.setAttribute("id", id);
        
        let name = pageInfo.name;
        if (name == "") {
          name = this._getEntity("page_" + pageInfo.key);
          ThumbnailZoomPlus.FilterService.pageList[i].name = name;
        }
        menuItem.setAttribute("label", name);
        menuItem.setAttribute("type", "checkbox");
        { 
          let aPage = i;
          menuItem.addEventListener("command",
                                    function() { ThumbnailZoomPlusChrome.Overlay.togglePagePreference(aPage);},
                                    true );
        }
        this._updatePagesMenuItemElement(pageInfo.key, menuItem);
        menuPopup.insertBefore(menuItem, menuSeparator);
      }
    }
  }