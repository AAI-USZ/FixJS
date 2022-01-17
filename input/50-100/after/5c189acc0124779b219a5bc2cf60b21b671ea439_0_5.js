function() {
    //Note: method calls must be Mappr.x for hotkeys to work
    $.each(['bbox_map', 'projection_map', 'bbox_rubberband', 'rotation', 'projection', 'pan'], function() {
      $('#' + this).val('');
    });
    Mappr.destroyRedo();
    Mappr.showMap();
  }