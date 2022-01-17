function(_super) {

    __extends(InfoWindow, _super);

    function InfoWindow() {
      InfoWindow.__super__.constructor.apply(this, arguments);
    }

    InfoWindow.prototype.defaultWidth = "350px";

    InfoWindow.prototype.contentViewName = "info_window";

    InfoWindow.prototype.customize = function() {
      var that;
      InfoWindow.__super__.customize.call(this);
      that = this;
      return google.maps.event.addDomListener(this.infoBox, "domready", function(e) {
        var div;
        div = that.infoBox.div_;
        return google.maps.event.addDomListener(div, "mousemove", function(e) {
          that.isMouseover = e.offsetX > 10 || e.toElement !== div;
          if (that.isMouseover) {
            e.cancelBubble = true;
            if (typeof e.preventDefault === "function") e.preventDefault();
            if (typeof e.stopPropagation === "function") e.stopPropagation();
            return that.map.closeTooltip();
          }
        });
      });
    };

    return InfoWindow;

  }