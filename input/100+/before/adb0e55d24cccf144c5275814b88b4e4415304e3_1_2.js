function (image) {
    image.onload = null;
    if (image.width > 1){
      var targetWidth = this.get('imageWidth'),
          targetHeight = this.get('imageHeight'),
          srcWidth = image.width,
          srcHeight = image.height;
      
      var scaledHeight =  (targetHeight / srcHeight);
      var scaledWidth  =  (targetWidth  / srcWidth);
      var scalar = scaledWidth < scaledHeight ? scaledHeight : scaledWidth; 
      var newWidth = srcWidth * scalar;
      var newHeight = srcHeight * scalar;      
      // RunLoop here, or image won't change until mouse moves
      SC.RunLoop.begin();
        this.set('imageWidth', newWidth);
        this.set('imageHeight', newHeight);
      SC.RunLoop.end();
    }
  }