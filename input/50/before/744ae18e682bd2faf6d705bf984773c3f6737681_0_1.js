function update(){
      if( _state ){
        _icon.removeAttribute( "state" );
      }
      else {
        _icon.setAttribute( "state", true );
      } //if
    }