function ( value, trigger, refresh ) {
      this._clearInteractiveTimeout( );

      value = Math.max( value, 0 );
      this._pixelSizeInteractive = this._getPixelSize( value );

      this._setInteractiveTimeout( trigger );
    }