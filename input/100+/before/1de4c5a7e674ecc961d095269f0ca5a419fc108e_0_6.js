function () {
      if ( ! this._options[ "pannable" ] ) {
        return;
      }

      var dx = this._current[0] - this._lastDrag[0],
          dy = this._current[1] - this._lastDrag[1],
          i = 0,
          service,
          translateObj;

      if (this._toolPan || dx > 3 || dx < -3 || dy > 3 || dy < -3) {
        if (!this._toolPan) {
          this._toolPan = true;
          this._$eventTarget.css("cursor", this._options["cursors"]["pan"]);
        }

        if (this._mouseDown) {
          this._velocity = [dx, dy];
        }

        if (dx !== 0 || dy !== 0) {
          this._panning = true;
          this._lastDrag = this._current;

          this._centerInteractive[ 0 ] -= ( dx * this._pixelSizeInteractive );
          this._centerInteractive[ 1 ] += ( ( this._options[ "axisLayout" ] === "image" ? -1 : 1 ) * dy * this._pixelSizeInteractive );
          this._interactiveTransform( );
        }
      }
    }