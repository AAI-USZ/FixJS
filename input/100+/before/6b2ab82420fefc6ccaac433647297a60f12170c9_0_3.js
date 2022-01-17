function controlPointAdded(evt) {
    var wkt_data = evt.feature.geometry.toString();
    
    // set x/y in form
    $("#control_point_wkt_data").attr("value", wkt_data);
    $("#control_point_x").attr("value", evt.feature.geometry.x);
    $("#control_point_y").attr("value", evt.feature.geometry.y);
    
    // reset the place search box and slide up panel
    $("#place-search").attr("value", "");
    $("#modal-control-point").modal();
    $("#place-search").focus();
  }