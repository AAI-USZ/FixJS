function (center, pixelSize, trigger, refresh) {
      if ( ! $.isArray( center ) || center.length != 2 || typeof center[ 0 ] !== "number" || typeof center[ 1 ] !== "number" ) {
        return;
      }

      // the final call during any extent change
      // only called by timeoutInteractive & resize

      if ( this._options[ "tilingScheme" ] ) {
        var zoom = this._getZoom( center, pixelSize );
        this._pixelSizeInteractive = pixelSize = this._getPixelSize( zoom );
      } else {
        if ( this._getZoom( center, pixelSize ) < 0 ) {
          this._pixelSizeInteractive = pixelSize = this._pixelSizeMax;
        }
      }

      this._center[ 0 ] = center[ 0 ];
      this._center[ 1 ] = center[ 1 ];
      this._options["pixelSize"] = this._pixelSize = pixelSize;

      if ( this._userGeodetic ) {
        this._options["bbox"] = $.geo.proj.toGeodetic( this._getBbox() );
        this._options["center"] = $.geo.proj.toGeodetic( this._center );
      } else {
        this._options["bbox"] = this._getBbox();
        this._options["center"] = $.merge( [ ], center );
      }

      this._options["zoom"] = this._getZoom();

      if (trigger) {
        this._trigger("bboxchange", window.event, { bbox: $.merge( [ ], this._options["bbox"] ) });
      }

      if (refresh) {
        this._refresh();
        this._refreshDrawing();
      }
    }