function () {
    //Note: method calls must be Mappr.x for hotkeys to work
    Mappr.resetJbbox();
    Mappr.destroyRedo();
    Mappr.showMap();
    $("#tabs").tabs('select',0);
  }