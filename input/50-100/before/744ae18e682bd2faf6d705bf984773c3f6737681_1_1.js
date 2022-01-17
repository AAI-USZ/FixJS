function( val ){
          if( _state !== val ){
            _state = val;
            if( _state ){
              document.body.classList.remove( "minimized" );
              _element.setAttribute( "ui-state", "visible" );
              _this.dispatch( "uivisibilitychanged", true );
            }
            else {
              document.body.classList.add( "minimized" );
              _element.setAttribute( "ui-state", "hidden" );
              _this.dispatch( "uivisibilitychanged", false );
            } //if
          } //if
        }