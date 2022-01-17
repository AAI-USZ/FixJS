function onMouseUp( e ){
      _button.removeAttribute( "data-mouse-state" );
      window.removeEventListener( "mouseup", onMouseUp, false );
    }