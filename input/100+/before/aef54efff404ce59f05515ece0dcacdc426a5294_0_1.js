function (e) {
      if ( this._options[ "mode" ] === "static" ) {
        return;
      }

      if ( !this._mouseDown ) {
        if ( _ieVersion == 7 ) {
          // ie7 doesn't appear to trigger dblclick on this._$eventTarget,
          // we fake regular click here to cause soft dblclick
          this._eventTarget_touchstart(e);
        } else {
          // Chrome & Firefox trigger a rogue mouseup event when doing a dblclick maximize in Windows(/Linux?)
          // ignore it
          return false;
        }
      }

      var doInteractiveTimeout = this._clearInteractiveTimeout( );

      var mouseWasDown = this._mouseDown,
          wasToolPan = this._toolPan,
          offset = this._$eventTarget.offset(),
          shift = this._options[ "shift" ],
          mode = this._shiftDown ? ( shift === "default" ? "zoom" : shift ) : this._options["mode"],
          current, i, clickDate,
          dx, dy;

      if (this._supportTouch) {
        current = [e.originalEvent.changedTouches[0].pageX - offset.left, e.originalEvent.changedTouches[0].pageY - offset.top];
      } else {
        current = [e.pageX - offset.left, e.pageY - offset.top];
      }

      if (this._softDblClick) {
        if (this._isTap) {
          dx = current[0] - this._anchor[0];
          dy = current[1] - this._anchor[1];
          if (Math.sqrt((dx * dx) + (dy * dy)) <= 8) {
            current = $.merge( [ ], this._anchor );
          }
        }
      }

      dx = current[0] - this._anchor[0];
      dy = current[1] - this._anchor[1];

      this._$eventTarget.css("cursor", this._options["cursors"][this._options["mode"]]);

      this._shiftDown = this._mouseDown = this._toolPan = false;

      if ( this._isMultiTouch ) {
        e.preventDefault( );
        this._isMultiTouch = false;

        this._wheelLevel = 0;

        if ( doInteractiveTimeout ) {
          this._setInteractiveTimeout( true );
        }
        return false;
      }

      if (document.releaseCapture) {
        document.releaseCapture();
      }

      if (mouseWasDown) {
        clickDate = $.now();
        this._current = current;

        switch ( mode ) {
          case "zoom":
          case "dragBbox":
            if ( dx !== 0 || dy !== 0 ) {
              var minSize = this._pixelSize * 6,
                  bboxCoords = this._toMap( [ [
                      Math.min( this._anchor[ 0 ], current[ 0 ] ),
                      Math.max( this._anchor[ 1 ], current[ 1 ] )
                    ], [
                      Math.max( this._anchor[ 0 ], current[ 0 ] ),
                      Math.min( this._anchor[ 1 ], current[ 1 ] )
                    ]
                  ] ),
                  bbox = [
                    bboxCoords[0][0],
                    bboxCoords[0][1],
                    bboxCoords[1][0],
                    bboxCoords[1][1]
                  ],
                  polygon;

              if ( mode === "zoom" ) {
                if ( ( bbox[2] - bbox[0] ) < minSize && ( bbox[3] - bbox[1] ) < minSize ) {
                  bbox = $.geo.scaleBy( this._getBbox( $.geo.center( bbox, true ) ), 0.5, true );
                }

                this._setBbox(bbox, true, true);
                doInteractiveTimeout = true;
              } else {
                polygon = $.geo.polygonize( bbox, true );
                this._trigger( "shape", e, this._userGeodetic ? {
                  type: "Polygon",
                  coordinates: $.geo.proj.toGeodetic( polygon.coordinates )
                } : polygon );
              }
            }

            this._resetDrawing();
            break;

          case "drawPoint":
            if (this._drawTimeout) {
              window.clearTimeout(this._drawTimeout);
              this._drawTimeout = null;
            }

            if (wasToolPan) {
              this._panFinalize();
            } else {
              if (clickDate - this._clickDate > 100) {
                var geomap = this;
                this._drawTimeout = setTimeout(function () {
                  if (geomap._drawTimeout) {
                    geomap._trigger("shape", e, { type: "Point", coordinates: geomap.toMap(current) });
                    geomap._inOp = false;
                    geomap._drawTimeout = null;
                  }
                }, 250);
              }
            }
            break;

          case "drawLineString":
          case "drawPolygon":
          case "measureLength":
          case "measureArea":
            if (wasToolPan) {
              this._panFinalize();
            } else {
              i = (this._drawCoords.length === 0 ? 0 : this._drawCoords.length - 1);

              this._drawCoords[i] = this._toMap(current);
              this._drawPixels[i] = current;

              if (i < 2 || !(this._drawCoords[i][0] == this._drawCoords[i-1][0] &&
                             this._drawCoords[i][1] == this._drawCoords[i-1][1])) {
                this._drawCoords[i + 1] = this._toMap( current, this._centerInteractive, this._pixelSizeInteractive );
                this._drawPixels[i + 1] = current;
              }

              this._refreshDrawing();
            }
            break;

          default:
            if (wasToolPan) {
              this._panFinalize();
            } else {
              if (clickDate - this._clickDate > 100) {
                this._trigger("click", e, { type: "Point", coordinates: this.toMap(current) });
                this._inOp = false;
              }
            }
            break;
        }

        this._clickDate = clickDate;

        if (this._softDblClick && this._isDbltap) {
          this._isDbltap = this._isTap = false;
          if ( doInteractiveTimeout ) {
            this._setInteractiveTimeout( true );
          }
          this._$eventTarget.trigger("dblclick", e);
          return false;
        }
      }

      if ( doInteractiveTimeout ) {
        this._setInteractiveTimeout( true );
      }

      if ( this._inOp ) {
        e.preventDefault();
        return false;
      }
    }