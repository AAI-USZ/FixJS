function(changeTo){
    var imgWidth;
    var imgHeight;
    if (changeTo == "cover"){
      if (IconResizing.sizeRatio >= 1) {
        imgHeight = IconResizing.tileHeight;
        imgWidth = imgHeight * IconResizing.sizeRatio;
      }
      else {
        imgWidth = IconResizing.tileWidth;
        imgHeight = imgWidth / IconResizing.sizeRatio;
      }
    }
    else if (changeTo == "contain"){
      if (IconResizing.sizeRatio >= 1){
        imgWidth = IconResizing.tileWidth;
        imgHeight = imgWidth / IconResizing.sizeRatio;
      }
      else {
        imgHeight = IconResizing.tileHeight;
        imgWidth = imgHeight * IconResizing.sizeRatio; 
      }
    }

    IconResizing.previewTile.css("background-size", imgWidth + "px " + imgHeight + "px");

    IconResizing.updateSlider();
    IconResizing.savePosition();
  }