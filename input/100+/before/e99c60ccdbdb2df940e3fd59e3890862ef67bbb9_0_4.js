function() {
    var slider = $("#icon-resize-scale-controls #zoom-slider");
    var imgWidth = extractNumber(IconResizing.previewTile.filter(":eq(0)").css("background-size").split(" ")[0]);
    var zoomPerStep = IconResizing.getZoomPerStep(slider.attr("max"));
    var step;
    if (IconResizing.imgWidth >= IconResizing.tileWidth) {
      step = (imgWidth - IconResizing.tileWidth) / zoomPerStep;
    }
    else {
      step = (IconResizing.tileWidth - IconResizing.imgWidth) / zoomPerStep;
    }
    slider.val(step);
  }