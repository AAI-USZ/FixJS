function(context, firstTime) {
    sc_super();
    if (this.get('image').width > 1){
      // debugger
      var targetWidth  = this.get('layout').width,
          targetHeight = this.get('layout').height,
          srcWidth     = this.get('image').width,
          srcHeight    = this.get('image').height;
      

      var scaledHeight =  (targetHeight / srcHeight);
      var scaledWidth  =  (targetWidth  / srcWidth);
      var scalar = scaledWidth < scaledHeight ? scaledHeight : scaledWidth; 
      var newWidth = srcWidth * scalar;
      var newHeight = srcHeight * scalar;      

      // if we're close, don't adjust or we'll keep iterating down to zero
      if (Math.abs(targetWidth - newWidth) > 2 ||
          Math.abs(targetHeight - newHeight) > 2){
        this.adjust('width', newWidth);
        this.adjust('height', newHeight);
      }
    }
  }