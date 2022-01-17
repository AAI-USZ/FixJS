function() {
      var cancelHandler, event, events, overlayProjection, pos, _j, _len1, _results,
        _this = this;
      cancelHandler = function(e) {
        e.cancelBubble = true;
        if (e.stopPropagation) {
          return e.stopPropagation();
        }
      };
      overlayProjection = this.getProjection();
      pos = overlayProjection.fromLatLngToDivPixel(this.marker.position);
      this.wrap.css({
        left: pos.x + 30,
        top: pos.y - 80
      });
      events = ['mousedown', 'touchstart', 'touchend', 'touchmove', 'contextmenu', 'click', 'dblclick', 'mousewheel', 'DOMMouseScroll'];
      this.listeners = [];
      _results = [];
      for (_j = 0, _len1 = events.length; _j < _len1; _j++) {
        event = events[_j];
        _results.push(this.listeners.push(google.maps.event.addDomListener(this.wrap[0], event, cancelHandler)));
      }
      return _results;
    }