function (e, delta) {
      if ( this._options[ "mode" ] === "static" || this._options[ "scroll" ] === "off" ) {
        return;
      }

      e.preventDefault();

      if ( this._mouseDown ) {
        return false;
      }

      if (delta !== 0) {
        this._clearInteractiveTimeout( );

        var offset = $(e.currentTarget).offset();
        this._anchor = [e.pageX - offset.left, e.pageY - offset.top];

        var wheelCenterAndSize = this._getZoomCenterAndSize( this._anchor, delta, this._options[ "tilingScheme" ] !== null ),
            service,
            i = 0;

        this._centerInteractive = wheelCenterAndSize.center;
        this._pixelSizeInteractive = wheelCenterAndSize.pixelSize;
        this._interactiveTransform( );

        this._setInteractiveTimeout( true );
      }

      return false;
    }