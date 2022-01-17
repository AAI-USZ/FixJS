function() {
      var overlayProjection, pos;
      overlayProjection = this.getProjection();
      pos = overlayProjection.fromLatLngToDivPixel(this.marker.position);
      return this.wrap.css({
        left: pos.x + 30,
        top: pos.y - 80
      });
    }