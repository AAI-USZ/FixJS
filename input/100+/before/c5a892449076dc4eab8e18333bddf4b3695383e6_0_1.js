function (context, firstTime) {
    var attrs = {
      'x': this.get('x'),
      'y': this.get('y'),
      'width': this.get('width'),
      'height': this.get('height')
    };
    
    attrs.src = this.get('imageUrl');
    
    if (firstTime) {
      this._reloadImage();
      context.callback(this, this.renderCallback, attrs);
      this.renderChildViews(context,firstTime);
    }
    else {
      this._raphaelImage.attr(attrs);
    }
  }