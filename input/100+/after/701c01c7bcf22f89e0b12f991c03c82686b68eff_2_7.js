function() {
      var _this = this;
      Tooltip.__super__.customize.call(this);
      return google.maps.event.addDomListener(this.infoBox, "domready", function(e) {
        var closeBox, div;
        div = _this.infoBox.div_;
        google.maps.event.addDomListener(div, "click", function(e) {
          return _this.map.openInfoWindow(_this.options);
        });
        closeBox = div.firstChild;
        return $(closeBox).hide();
      });
    }