function() {
    // if flash function is present, call it
    this._config.flash && this._config.flash(this._container);

    this._context.drawImage(this._video, 0, 0, this._config.imgWidth,
                            this._config.imgHeight);

    var src = this._canvas.toDataURL('image/' + this._config.imgFormat);
    var format = src.match(/^data:image\/(\w+);/)[1];

    var photo = {
      src: src,
      format: format,
      width: this._config.imgWidth,
      height: this._config.imgHeight
    };

    // push a copy of the latest photo into the photos array
    this._photos.push(extend(photo));

    return photo;
  }