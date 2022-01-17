function onZoomDone() {
      $tab.removeClass("front");
      $canvas.css("transform", null);

      if (typeof complete == "function")
        complete();
    }