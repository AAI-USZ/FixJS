function(e) {
      var doInteractiveTimeout = this._clearInteractiveTimeout( );

      this._trigger("dblclick", e, { type: "Point", coordinates: this._toMap(this._current, this._centerInteractive, this._pixelSizeInteractive ) });

      if (!e.isDefaultPrevented()) {
        var centerAndSize = this._getZoomCenterAndSize(this._current, 1, true );

        this._setInteractiveCenterAndSize( centerAndSize.center, centerAndSize.pixelSize );
        this._interactiveTransform( );

        doInteractiveTimeout = true;
      }

      if ( doInteractiveTimeout ) {
        this._setInteractiveTimeout( true );
      }
    }