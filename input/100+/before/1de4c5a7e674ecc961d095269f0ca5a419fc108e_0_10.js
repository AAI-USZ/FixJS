function (e) {
      if ( this._options[ "mode" ] === "static" ) {
        return;
      }

      var doInteractiveTimeout = this._clearInteractiveTimeout( );

      var offset = this._$eventTarget.offset(),
          drawCoordsLen = this._drawCoords.length,
          touches = e.originalEvent.changedTouches,
          current,
          service,
          i = 0;

      if ( this._supportTouch ) {
        if ( !this._isMultiTouch && touches[ 0 ].identifier !== this._multiTouchAnchor[ 0 ].identifier ) {
          // switch to multitouch
          this._mouseDown = false;
          this._isMultiTouch = true;
          this._wheelLevel = 0;

          this._multiTouchAnchor.push( touches[ 0 ] );

          this._multiTouchCurrentBbox = [
            this._multiTouchCurrentBbox[ 0 ],
            this._multiTouchCurrentBbox[ 1 ],
            this._multiTouchAnchor[1].pageX - offset.left,
            this._multiTouchAnchor[1].pageY - offset.top
          ];

          this._multiTouchAnchorBbox = $.merge( [ ], this._multiTouchCurrentBbox );

          this._mouseDown = true;
          this._anchor = this._current = $.geo.center( this._multiTouchCurrentBbox, true );

          if ( doInteractiveTimeout ) {
            this._setInteractiveTimeout( true );
          }
          return false;
        }

        if ( this._isMultiTouch ) {

          for ( ; i < touches.length; i++ ) {
            if ( touches[ i ].identifier === this._multiTouchAnchor[ 0 ].identifier ) {
              this._multiTouchCurrentBbox[ 0 ] = touches[ i ].pageX - offset.left;
              this._multiTouchCurrentBbox[ 1 ] = touches[ i ].pageY - offset.top;
            } else if ( touches[ i ].identifier === this._multiTouchAnchor[ 1 ].identifier ) {
              this._multiTouchCurrentBbox[ 2 ] = touches[ i ].pageX - offset.left;
              this._multiTouchCurrentBbox[ 3 ] = touches[ i ].pageY - offset.top;
            }
          }

          current = $.geo.center( this._multiTouchCurrentBbox, true );

          var currentWidth = this._multiTouchCurrentBbox[ 2 ] - this._multiTouchCurrentBbox[ 0 ],
              anchorWidth = this._multiTouchAnchorBbox[ 2 ] - this._multiTouchAnchorBbox[ 0 ],
              ratioWidth = currentWidth / anchorWidth;

          var wheelLevel = Math.abs( Math.floor( ( 1 - ratioWidth ) * 10 ) );
          if ( Math.abs( currentWidth ) < Math.abs( anchorWidth ) ) {
            wheelLevel = - wheelLevel;
          }

          var delta = wheelLevel - this._wheelLevel;

          this._wheelLevel = wheelLevel;

          var pinchCenterAndSize = this._getZoomCenterAndSize( this._anchor, delta, false );

          this._centerInteractive = pinchCenterAndSize.center;
          this._pixelSizeInteractive = pinchCenterAndSize.pixelSize;
          this._interactiveTransform( );

          doInteractiveTimeout = true;

          current = $.geo.center( this._multiTouchCurrentBbox, true );
        } else {
          current = [e.originalEvent.changedTouches[0].pageX - offset.left, e.originalEvent.changedTouches[0].pageY - offset.top];
        }
      } else {
        current = [e.pageX - offset.left, e.pageY - offset.top];
      }

      if (current[0] === this._lastMove[0] && current[1] === this._lastMove[1]) {
        if ( this._inOp ) {
          e.preventDefault();
          if ( doInteractiveTimeout ) {
            this._setInteractiveTimeout( true );
          }
          return false;
        }
      }

      if ( _ieVersion == 7 ) {
        this._isDbltap = this._isTap = false;
      }

      if (this._mouseDown) {
        this._current = current;
        this._moveDate = $.now();
      }

      if ( this._isMultiTouch ) {
        e.preventDefault( );
        this._isDbltap = this._isTap = false;
        if ( doInteractiveTimeout ) {
          this._setInteractiveTimeout( true );
        }
        return false;
      }

      var shift = this._options[ "shift" ],
          mode = this._shiftDown ? ( shift === "default" ? "zoom" : shift ) : this._options["mode"],
          dx, dy, circleSize;

      switch (mode) {
        case "zoom":
        case "dragBbox":
          if ( this._mouseDown ) {
            this._$drawContainer.geographics( "clear" );
            this._$drawContainer.geographics( "drawBbox", [
              this._anchor[ 0 ],
              this._anchor[ 1 ],
              current[ 0 ],
              current[ 1 ]
            ] );
          } else {
            this._trigger("move", e, { type: "Point", coordinates: this.toMap(current) });
          }
          break;

        case "dragCircle":
          if ( this._mouseDown ) {
            dx = current[ 0 ] - this._anchor[ 0 ];
            dy = current[ 1 ] - this._anchor[ 1 ];
            circleSize = Math.sqrt( ( dx * dx) + ( dy * dy ) ) * 2;
            //circleSize = Math.max( Math.abs( current[ 0 ] - this._anchor[ 0 ] ), Math.abs( current[ 1 ] - this._anchor[ 1 ] ) ) * 2;

            // not part of _refreshDrawing
            this._$drawContainer.geographics( "clear" );
            this._$drawContainer.geographics( "drawArc", this._anchor, 0, 360, {
              width: circleSize,
              height: circleSize
            } );
          } else {
            this._trigger("move", e, { type: "Point", coordinates: this.toMap(current) });
          }
          break;

        case "drawLineString":
        case "drawPolygon":
        case "measureLength":
        case "measureArea":
          if (this._mouseDown || this._toolPan) {
            this._panMove();
            doInteractiveTimeout = true;
          } else {
            if (drawCoordsLen > 0) {
              this._drawCoords[drawCoordsLen - 1] = this._toMap( current, this._centerInteractive, this._pixelSizeInteractive );
              this._drawPixels[drawCoordsLen - 1] = current;

              this._refreshDrawing();
            }

            this._trigger("move", e, { type: "Point", coordinates: this.toMap(current) });
          }
          break;

        default:
          if (this._mouseDown || this._toolPan) {
            this._panMove();
            doInteractiveTimeout = true;
          } else {
            this._trigger("move", e, { type: "Point", coordinates: this.toMap(current) });
          }
          break;
      }

      this._lastMove = current;

      if ( doInteractiveTimeout ) {
        this._setInteractiveTimeout( true );
      }

      if ( this._inOp ) {
        e.preventDefault();
        return false;
      }
    }