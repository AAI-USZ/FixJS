function (key, value, refresh) {
      if ( key == "pixelSize" ) {
        return;
      }

      refresh = (refresh === undefined || refresh);

      if ( this._$elem.is( ".geo-map" ) ) {
        this._panFinalize();
      }

      var center, pixelSize, zoom;

      switch (key) {
        case "bbox":
          if ( this._created ) {
            this._clearInteractiveTimeout( );
          }

          this._userGeodetic = $.geo.proj && $.geo._isGeodetic( value );
          if ( this._userGeodetic ) {
            value = $.geo.proj.fromGeodetic( value );
          }

          center = [value[0] + (value[2] - value[0]) / 2, value[1] + (value[3] - value[1]) / 2];
          pixelSize = Math.max($.geo.width(value, true) / this._contentBounds.width, $.geo.height(value, true) / this._contentBounds.height);

          if (this._options["tilingScheme"]) {
            zoom = this._getZoom( center, pixelSize );
            pixelSize = this._getPixelSize( zoom );
          } else {
            if ( this._getZoom( center, pixelSize ) < 0 ) {
              pixelSize = this._pixelSizeMax;
            }
          }

          if ( this._created ) {
            this._setInteractiveCenterAndSize( center, pixelSize );
            this._setInteractiveTimeout( false );
          } else {
            this._setCenterAndSize( center, pixelSize, false, refresh );
          }

          value = this._getBbox();
          break;

        case "bboxMax":
          this._userGeodetic = $.geo.proj && $.geo._isGeodetic( value );
          break;

        case "center":
          if ( this._created ) {
            this._clearInteractiveTimeout( );
          }

          this._userGeodetic = $.geo.proj && $.geo._isGeodetic( value );
          if ( this._userGeodetic ) {
            value = $.geo.proj.fromGeodetic( value );
          }

          if ( this._created ) {
            this._setInteractiveCenterAndSize( value, this._pixelSize );
            this._setInteractiveTimeout( false );
          } else {
            this._setCenterAndSize( value, this._pixelSize, false, refresh );
          }
          break;

        case "measureLabels":
          value = $.extend( this._options[ "measureLabels" ], value );


          $.templates( this._tmplLengthId, this._options[ "measureLabels" ].length );
          $.templates( this._tmplAreaId, this._options[ "measureLabels" ].area );

          break;

        case "drawStyle":
          if (this._$drawContainer) {
            this._$drawContainer.geographics("option", "style", value);
            value = this._$drawContainer.geographics("option", "style");
          }
          break;

        case "shapeStyle":
          if (this._$shapesContainer) {
            this._$shapesContainer.geographics("option", "style", value);
            value = this._$shapesContainer.geographics("option", "style");
          }
          break;

        case "mode":
          this._resetDrawing( );
          this._$eventTarget.css("cursor", this._options["cursors"][value]);
          break;

        case "zoom":
          if ( this._created ) {
            this._setZoom(value, false, refresh);
          } else {
            value = Math.max( value, 0 );
            this._setCenterAndSize( this._center, this._getPixelSize( value ), false, refresh );
          }
          break;
      }

      $.Widget.prototype._setOption.apply(this, arguments);

      switch ( key ) {
        case "bbox":
        case "center":
          if ( this._userGeodetic ) {
            this._options[ "bbox" ] = $.geo.proj.toGeodetic( this._options[ "bbox" ] );
            this._options[ "center" ] = $.geo.proj.toGeodetic( this._center );
          }
          break;

        case "tilingScheme":
          if ( value !== null ) {
            this._pixelSizeMax = this._getPixelSize( 0 );
            this._centerMax = [
              value.origin[ 0 ] + this._pixelSizeMax * value.tileWidth / 2,
              value.origin[ 1 ] + this._pixelSizeMax * value.tileHeight / 2
            ];
          }
          break;

        case "bboxMax":
          if ( $.geo.proj && $.geo._isGeodetic( value ) ) {
            this._centerMax = $.geo.center( $.geo.proj.fromGeodetic( value ) );
          } else {
            this._centerMax = $.geo.center( value );
          }

          this._pixelSizeMax = Math.max($.geo.width(value, true) / this._contentBounds.width, $.geo.height(value, true) / this._contentBounds.height);
          break;

        case "services":
          this._createServices();
          if (refresh) {
            this._refresh();
          }
          break;

        case "shapeStyle":
          if ( refresh ) {
            this._$shapesContainer.geographics("clear");
            this._refreshShapes( this._$shapesContainer, this._graphicShapes, this._graphicShapes, this._graphicShapes );
          }
          break;
      }
    }