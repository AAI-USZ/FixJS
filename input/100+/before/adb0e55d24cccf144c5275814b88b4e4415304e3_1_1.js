function (context, firstTime) {
    
    var content = this.get('content');
    var hMargin = this.get('horizontalMargin');
    var vMargin = this.get('verticalMargin');

    if (firstTime) {
      // when we first load this image, create a new Image object so we can inspect 
      // the actual width and height, and then scale the rendered image appropriately 
      // while keeping the aspect ratio
      var image = new Image();
      var self = this;
      image.onload = function() {
        self.setImageDimensions(image);
      };
      image.src = content.get('image');
      
    }
    
    var attrs = {
          'x':              content.get('x'),
          'y':              content.get('y'),
          'r':              this.get('borderRadius'),
          'width':          this.get('bodyWidth'),
          'height':         this.get('bodyHeight'),
          'fill':           this.get('bodyColor'),
          'fill-opacity':   this.get('bodyOpacity'),
          'stroke':         this.get('borderColor'),
          'stroke-width':   this.get('borderWidth'),
          'stroke-opacity': this.get('borderOpacity')
        },

        imageAttrs = {

          src:    content.get('image'),
          x:      hMargin + content.get('x'), // +((hMargin-this.get('imageWidth'))/2),  // center narrow images
          y:      vMargin + content.get('y'),
          width:  this.get('imageWidth'),
          height: this.get('imageHeight')
        };

    if (firstTime) {
      context.callback(this, this.renderCallback, attrs, imageAttrs);
      this.renderChildViews(context,firstTime);
    }
    else {
      this._raphaelRect.attr(attrs);
      this._raphaelImage.attr(imageAttrs);
    }
  }