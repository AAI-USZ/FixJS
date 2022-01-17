function() {
    // if flash function is present, call it
    this._config.flash && this._config.flash(this._container);

    this._context.drawImage(this._video, 0, 0, this._config.imgWidth,
                            this._config.imgHeight);

    this._latestPhoto = this._canvas.toDataURL('image/png');
    this._photos.push(this._latestPhoto);
  }