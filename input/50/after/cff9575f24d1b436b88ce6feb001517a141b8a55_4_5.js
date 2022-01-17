function( e ){
      if( e.axis === e.VERTICAL_AXIS && !e.shiftKey ){
        outerElement.scrollTop += e.detail * 2;
        setHandlePosition();
        e.preventDefault();
      }
    }