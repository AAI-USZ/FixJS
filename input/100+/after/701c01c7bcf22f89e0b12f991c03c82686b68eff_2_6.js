function() {
      var _this = this;
      InfoWindow.__super__.customize.call(this);
      return google.maps.event.addDomListener(this.infoBox, "domready", function(e) {
        var closeBox, div;
        div = _this.infoBox.div_;
        google.maps.event.addDomListener(div, "mouseover", function(e) {
          _this.isMouseover = e.offsetX > 10 || e.toElement !== div;
          if (_this.isMouseover) {
            e.cancelBubble = true;
            if (typeof e.preventDefault === "function") e.preventDefault();
            if (typeof e.stopPropagation === "function") e.stopPropagation();
            return _this.map.closeTooltip();
          }
        });
        closeBox = div.firstChild;
        google.maps.event.addDomListener(closeBox, "click", function(e) {
          return _this.close();
        });
        return google.maps.event.addDomListener(closeBox, "mouseover", function(e) {
          return _this.isMouseover = true;
        });
      });
    }