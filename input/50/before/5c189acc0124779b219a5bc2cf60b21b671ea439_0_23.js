function () {
    //Note: method calls must be Mappr.x for hotkeys to work
    $('#pan').val('right');
    Mappr.resetJbbox();
    Mappr.destroyRedo();
    Mappr.showMap();
  }