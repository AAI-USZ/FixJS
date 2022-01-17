function(markers) {
    var group = this.canvas.addGroup(),
        i,
        marker,
        point,
        markerConfig,
        markersArray;

    if ($.isArray(markers)) {
      markersArray = markers.slice();
      markers = {};
      for (i = 0; i < markersArray.length; i++) {
        markers[i] = markersArray[i];
      }
    }

    for (i in markers) {
      markerConfig = markers[i] instanceof Array ? {latLng: markers[i]} : markers[i];
      point = this.latLngToPoint.apply(this, markerConfig.latLng || [0, 0]);

      marker = this.canvas.addCircle({
        "data-index": i,
        cx: point.x,
        cy: point.y
      }, $.extend(true, {}, this.params.markerStyle, {initial: markerConfig.style || {}}), group);
      marker.addClass('jvectormap-marker');
      if (this.markers[i]) {
        this.removeMarkers([i]);
      }
      this.markers[i] = {element: marker, config: markerConfig};
    }
  }