function() {
    var slider = $("#icon-resize-scale-controls #zoom-slider");
    var backgroundWidth = IconResizing.previewTile.filter(":eq(0)").css("background-size").split(" ")[0];
    if (backgroundWidth == "auto,") {
      if (IconResizing.imgWidth > IconResizing.tileWidth) {
        slider.val(slider.attr("max"));
      }
      else {
        slider.val(slider.attr("min"));
      }

    }
    else {
      var currentImgWidth = extractNumber(backgroundWidth);
      var zoomPerStep = IconResizing.getZoomPerStep(slider.attr("max"));
      var step;
      if (IconResizing.imgWidth >= IconResizing.tileWidth) {
        step = (currentImgWidth - IconResizing.tileWidth) / zoomPerStep;
      }
      else {
        step = (currentImgWidth - IconResizing.imgWidth) / zoomPerStep;
      }
      slider.val(step);
    }
  }