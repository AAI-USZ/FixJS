function () {
      this._options = this.options;

      if (this._$elem.is(".geo-service")) {
        this._map = this._$elem.data( "geoMap" );
        this._$shapesContainer.geographics( );
        this._options["shapeStyle"] = this._$shapesContainer.geographics("option", "style");
        return;
      }

      this._map = this;

      this._supportTouch = "ontouchend" in document;
      this._softDblClick = this._supportTouch || _ieVersion == 7;

      var geomap = this,
          touchStartEvent = this._supportTouch ? "touchstart" : "mousedown",
          touchStopEvent = this._supportTouch ? "touchend touchcancel" : "mouseup",
          touchMoveEvent = this._supportTouch ? "touchmove" : "mousemove";

      $(document).keydown($.proxy(this._document_keydown, this));

      this._$eventTarget.dblclick($.proxy(this._eventTarget_dblclick, this));

      this._$eventTarget.bind(touchStartEvent, $.proxy(this._eventTarget_touchstart, this));

      var dragTarget = (this._$eventTarget[0].setCapture) ? this._$eventTarget : $(document);
      dragTarget.bind(touchMoveEvent, $.proxy(this._dragTarget_touchmove, this));
      dragTarget.bind(touchStopEvent, $.proxy(this._dragTarget_touchstop, this));

      this._$eventTarget.mousewheel($.proxy(this._eventTarget_mousewheel, this));

      this._windowHandler = function () {
        if (geomap._resizeTimeout) {
          clearTimeout(geomap._resizeTimeout);
        }
        geomap._resizeTimeout = setTimeout(function () {
          if (geomap._created) {
            geomap._$elem.geomap( "resize", true );
          }
        }, 500);
      };

      $(window).resize(this._windowHandler);

      this._$drawContainer.geographics({ style: this._initOptions.drawStyle || {} });
      this._options["drawStyle"] = this._$drawContainer.geographics("option", "style");

      this._$shapesContainer.geographics( { style: this._initOptions.shapeStyle || { } } );
      this._options["shapeStyle"] = this._$shapesContainer.geographics("option", "style");

      if (this._initOptions) {
        if (this._initOptions.tilingScheme) {
          this._setOption("tilingScheme", this._initOptions.tilingScheme, false);
        }
        if ( this._initOptions.services ) {
          // jQuery UI Widget Factory merges user services with our default, we want to clobber the default
          this._options[ "services" ] = $.merge( [ ], this._initOptions.services );
        }
        if (this._initOptions.bbox) {
          this._setOption("bbox", this._initOptions.bbox, false);
        }
        if (this._initOptions.center) {
          this._setOption("center", this._initOptions.center, false);
        }
        if (this._initOptions.zoom !== undefined) {
          this._setOption("zoom", this._initOptions.zoom, false);
        }
      }

      $.templates( this._tmplLengthId, this._options[ "measureLabels" ].length );
      $.templates( this._tmplAreaId, this._options[ "measureLabels" ].area );

      this._$eventTarget.css("cursor", this._options["cursors"][this._options["mode"]]);

      this._createServices();
      this._refresh();

      this._created = true;
    }