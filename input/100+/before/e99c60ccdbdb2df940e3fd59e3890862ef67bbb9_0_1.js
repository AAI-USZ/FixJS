function() {
      IconResizing.imgWidth = IconResizing.tileImg.width();
      IconResizing.imgHeight = IconResizing.tileImg.height();
      if (IconResizing.imgWidth != 0) {
        IconResizing.sizeRatio = IconResizing.imgWidth / IconResizing.imgHeight;
        clearInterval(handler);
        if (callback) {
          callback();
        }
      }
    }