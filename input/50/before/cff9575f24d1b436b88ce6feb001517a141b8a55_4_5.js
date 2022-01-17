function( e ){
      if( e.axis === e.VERTICAL_AXIS && !e.shiftKey ){
        innerElement.scrollTop += e.detail * 2;
        setHandlePosition();
        e.preventDefault();
      }
    }