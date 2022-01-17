function(e) {
        var closeBox, div;
        div = that.infoBox.div_;
        google.maps.event.addDomListener(div, "click", function(e) {
          e.cancelBubble = true;
          return typeof e.stopPropagation === "function" ? e.stopPropagation() : void 0;
        });
        google.maps.event.addDomListener(div, "mouseout", function(e) {
          return that.isMouseover = false;
        });
        closeBox = div.firstChild;
        google.maps.event.addDomListener(closeBox, "click", function(e) {
          return that.close();
        });
        google.maps.event.addDomListener(closeBox, "mouseover", function(e) {
          return that.isMouseover = true;
        });
        return komoo.event.trigger(that, "domready");
      }