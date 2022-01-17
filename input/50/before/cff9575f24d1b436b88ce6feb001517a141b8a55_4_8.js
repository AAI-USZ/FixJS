function( e ){
      if( e.wheelDeltaX ){
        innerElement.scrollLeft -= e.wheelDeltaX;
        setHandlePosition();
        e.preventDefault();
      }
    }