function() {
    //Note: method calls must be Mappr.x for hotkeys to work
    Mappr.resetJbbox();
    $('#zoom_out').val(1);
    Mappr.destroyRedo();
    Mappr.showMap();
    $('#zoom_out').val('');
  }