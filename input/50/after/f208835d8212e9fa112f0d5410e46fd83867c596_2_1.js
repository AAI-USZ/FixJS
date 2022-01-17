function onkeydown(event) {
    if (event.keyCode === event.DOM_VK_HOME ||
        event.keyCode === event.DOM_VK_ESCAPE) {
      GridManager.setMode('normal');
      Permissions.hide();
    }
  }