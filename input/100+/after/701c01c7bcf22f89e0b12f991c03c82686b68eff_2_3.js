function(e) {
        var div;
        div = _this.infoBox.div_;
        google.maps.event.addDomListener(div, "click", function(e) {
          e.cancelBubble = true;
          return typeof e.stopPropagation === "function" ? e.stopPropagation() : void 0;
        });
        google.maps.event.addDomListener(div, "mouseout", function(e) {
          return _this.isMouseover = false;
        });
        return komoo.event.trigger(_this, "domready");
      }