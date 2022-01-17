function (value, trigger, refresh) {
      var center = [value[0] + (value[2] - value[0]) / 2, value[1] + (value[3] - value[1]) / 2],
          pixelSize = Math.max($.geo.width(value, true) / this._contentBounds.width, $.geo.height(value, true) / this._contentBounds.height);

      if (this._options["tilingScheme"]) {
        var zoom = this._getZoom( center, pixelSize );
        pixelSize = this._getPixelSize( zoom );
      } else {
        if ( this._getZoom( center, pixelSize ) < 0 ) {
          pixelSize = this._pixelSizeMax;
        }
      }

      this._centerInteractive = center;
      this._pixelSizeInteractive = pixelSize;
      this._interactiveTransform( );
    }