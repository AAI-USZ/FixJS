function() {
      var that;
      Tooltip.__super__.customize.call(this);
      that = this;
      return google.maps.event.addDomListener(this.infoBox, "domready", function(e) {
        var closeBox, div;
        div = that.infoBox.div_;
        google.maps.event.addDomListener(div, "click", function(e) {
          return that.map.openInfoWindow(that.options);
        });
        closeBox = div.firstChild;
        return $(closeBox).hide();
      });
    }