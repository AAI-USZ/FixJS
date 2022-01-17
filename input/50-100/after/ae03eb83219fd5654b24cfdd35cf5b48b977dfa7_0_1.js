function( val ){
          if( _state !== val ){
            _state = val;
            if( _state ){
              _element.classList.remove( "minimized" );
              _this.dispatch( "uivisibilitychanged", true );
            }
            else {
              _element.classList.add( "minimized" );
              _this.dispatch( "uivisibilitychanged", false );
            } //if
          } //if
        }