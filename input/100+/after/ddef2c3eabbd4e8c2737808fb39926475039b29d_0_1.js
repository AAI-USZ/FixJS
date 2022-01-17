function() {
      var newImgWidth = IconResizing.tileImg.width();
      var newImgHeight = IconResizing.tileImg.height();
      if (newImgWidth != 0) {
        // if image is changed then reset its position and zoom level
        if (IconResizing.id == previousId && (IconResizing.imgWidth != newImgWidth || IconResizing.imgHeight != newImgHeight)) {
          IconResizing.imgWidth = newImgWidth;
          IconResizing.imgHeight = newImgHeight;
          IconResizing.sizeRatio = IconResizing.imgWidth / IconResizing.imgHeight;
          IconResizing.resetTileIcon();
        }
        else {
          IconResizing.imgWidth = newImgWidth;
          IconResizing.imgHeight = newImgHeight;
          IconResizing.sizeRatio = IconResizing.imgWidth / IconResizing.imgHeight;
        }
        clearInterval(handler);
        if (callback) {
          callback();
        }
      }
    }