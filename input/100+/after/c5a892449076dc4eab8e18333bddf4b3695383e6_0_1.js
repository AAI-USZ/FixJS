function (context, firstTime) {
    var attrs = {
      'x': this.get('x'),
      'y': this.get('y'),
      'width': this.get('width'),
      'height': this.get('height')
    };

    // dont load 'blank' images.
    var imageUrl = this.get('imageUrl');
    if (typeof imageUrl === 'string') {
      var nowhite = imageUrl.replace(/\s+/,"");
      if (nowhite.length > 0) {
        attrs.src = imageUrl;
      }
    }
    
    if (firstTime) {
      this._reloadImage();
      context.callback(this, this.renderCallback, attrs);
      this.renderChildViews(context,firstTime);
    }
    else {
      this._raphaelImage.attr(attrs);
    }
  }