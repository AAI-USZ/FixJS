function featureSelected(evt) {
    var class_name = evt.feature.geometry.CLASS_NAME;
    if (!evt.feature.tooltip) {
      if (class_name == "OpenLayers.Geometry.Point") {
        evt.feature.tooltip = new MapHub.ControlPointTooltip(evt.feature.control_point, self.user_id);
      } else {
        evt.feature.tooltip = new MapHub.AnnotationTooltip(evt.feature.annotation, self.user_id);
      }
      self.tooltips.push(evt.feature.tooltip);
    }
    // get the screen coordinates
    var lonlat = evt.feature.geometry.getBounds().getCenterLonLat();
    var coords = this.map.getPixelFromLonLat(lonlat);
    evt.feature.tooltip.show(coords.x, coords.y);
  }