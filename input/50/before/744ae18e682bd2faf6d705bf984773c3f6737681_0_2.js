function onMouseUp( e ){
      _button.removeAttribute( "mouse-state" );
      window.removeEventListener( "mouseup", onMouseUp, false );
    }