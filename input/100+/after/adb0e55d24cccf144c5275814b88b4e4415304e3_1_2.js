function (image) {
    image.onload = null;
    if (image.width > 1){
      var targetWidth =  (this.get('bodyWidth') * 0.9),
          targetHeight = (this.get('bodyHeight') * 0.9),
          srcWidth = image.width,
          srcHeight = image.height;
      
      var scaledHeight =  (targetHeight / srcHeight);
      var scaledWidth  =  (targetWidth  / srcWidth);
      var scalar = scaledWidth < scaledHeight ? scaledWidth : scaledHeight; 
      var newWidth = srcWidth * scalar;
      var newHeight = srcHeight * scalar;

      SC.RunLoop.begin();
        this.set('imageWidth', newWidth);
        this.set('imageHeight', newHeight);
      SC.RunLoop.end();
    }
  }