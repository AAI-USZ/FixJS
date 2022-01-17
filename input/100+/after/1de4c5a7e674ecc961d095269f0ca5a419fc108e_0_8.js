function ( center, pixelSize ) {
      // set the temporary (interactive) center & size
      // also, update the public-facing options
      this._centerInteractive[ 0 ] = center[ 0 ];
      this._centerInteractive[ 1 ] = center[ 1 ];
      this._pixelSizeInteractive = pixelSize;

      if ( this._userGeodetic ) {
        this._options["bbox"] = $.geo.proj.toGeodetic( this._getBbox( center, pixelSize ) );
        this._options["center"] = $.geo.proj.toGeodetic( center );
      } else {
        this._options["bbox"] = this._getBbox( center, pixelSize );
        this._options["center"][ 0 ] = center[ 0 ];
        this._options["center"][ 1 ] = center[ 1 ];
      }

      this._options["pixelSize"] = pixelSize;
      this._options["zoom"] = this._getZoom( center, pixelSize );
    }