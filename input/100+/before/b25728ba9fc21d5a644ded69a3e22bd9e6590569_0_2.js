function() {
      var cancelHandler, overlayProjection, pos,
        _this = this;
      cancelHandler = function(e) {
        e.cancelBubble = true;
        console.log("mousedown");
        return e.stopPropagation();
      };
      overlayProjection = this.getProjection();
      pos = overlayProjection.fromLatLngToDivPixel(this.marker.position);
      this.wrap.css({
        left: pos.x + 30,
        top: pos.y - 80
      });
      this.eventListener1_ = google.maps.event.addDomListener(this.wrap[0], "mousedown", cancelHandler);
      this.eventListener2_ = google.maps.event.addDomListener(this.wrap[0], "click", cancelHandler);
      this.eventListener3_ = google.maps.event.addDomListener(this.wrap[0], "dblclick", cancelHandler);
      return this.contextListener_ = google.maps.event.addDomListener(this.wrap[0], "contextmenu", cancelHandler);
    }