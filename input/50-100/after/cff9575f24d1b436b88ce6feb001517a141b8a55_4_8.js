function( e ){
      if( e.axis === e.HORIZONTAL_AXIS || ( e.axis === e.VERTICAL_AXIS && e.shiftKey )){
        outerElement.scrollLeft += e.detail * 2;
        setHandlePosition();
        e.preventDefault();
      }
    }