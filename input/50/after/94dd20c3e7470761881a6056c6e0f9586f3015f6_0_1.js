function cm_handleEvent(evt) {
    ListMenu.request(evt.detail.contextmenu.items,
      function sm_clickHandler(action) {
        evt.detail.contextMenuItemSelected(action);
    });
  }