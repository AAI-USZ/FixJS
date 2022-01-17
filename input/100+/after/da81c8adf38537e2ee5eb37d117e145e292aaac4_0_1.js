function( domEvent ) {
      if( this._touchSession !== null ) {
                var touch = this._getTouch( domEvent );
        var pos = [ touch.clientX, touch.clientY ];
        if( this._touchSession.type.virtualScroll ) {
          this._handleVirtualScroll( pos );
          delete this._touchSession.type.outerScroll;
        }
        if( !this._touchSession.type.scroll ) {
          event.preventDefault();
        }
        if ( this._touchSession.type.drag ) {
          domEvent.preventDefault();
          var target = domEvent.target;
          this._fireMouseEvent( "mousemove", target, domEvent, pos );
        } else {
          var oldPos = this._touchSession.initialPosition;
          // TODO [tb] : offset too big for good use with touch-scrolling
          if(    Math.abs( oldPos[ 0 ] - pos[ 0 ] ) >= 15
              || Math.abs( oldPos[ 1 ] - pos[ 1 ] ) >= 15 )
          {
            if( this._touchSession.type.click ) {
              this._cancelMouseSession( domEvent );
            } else if( this._touchSession.type.focus ) {
              delete this._touchSession.type.focus;
              this._touchSession.type.blur = true;
            }
          }
        }
      }
    }