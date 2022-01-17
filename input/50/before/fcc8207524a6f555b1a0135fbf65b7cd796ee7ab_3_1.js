function onZoomDone() {
      $tab.removeClass("front");
      $canvas.css("-moz-transform", null);

      if (typeof complete == "function")
        complete();
    }