function update(){
      if( _state ){
        _icon.removeAttribute( "data-state" );
      }
      else {
        _icon.setAttribute( "data-state", true );
      } //if
    }