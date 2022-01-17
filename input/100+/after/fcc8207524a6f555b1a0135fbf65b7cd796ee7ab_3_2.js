function TabItem_zoomOut(complete) {
    let $tab = this.$container, $canvas = this.$canvas;
    var self = this;
    
    let onZoomDone = function onZoomDone() {
      $tab.removeClass("front");
      $canvas.css("transform", null);

      if (typeof complete == "function")
        complete();
    };

    UI.setActive(this);
    TabItems._update(this.tab, {force: true});

    $tab.addClass("front");

    let animateZoom = gPrefBranch.getBoolPref("animate_zoom");
    if (animateZoom) {
      // The scaleCheat of 2 here is a clever way to speed up the zoom-out
      // code. See getZoomTransform() below.
      let transform = this.getZoomTransform(2);
      TabItems.pausePainting();

      $canvas.css({
        'transform': transform.transform,
        'transform-origin': transform.transformOrigin
      });

      $canvas.animate({ "transform": "scale(1.0)" }, {
        duration: 300,
        easing: 'cubic-bezier', // note that this is legal easing, even without parameters
        complete: function() {
          TabItems.resumePainting();
          onZoomDone();
        }
      });
    } else {
      onZoomDone();
    }
  }