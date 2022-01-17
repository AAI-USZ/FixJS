function setHandlePosition(){
      if( _scrollWidth - _elementWidth > 0 ) {
        _handle.style.left = ( _elementWidth - _handleWidth ) *
          ( innerElement.scrollLeft / ( _scrollWidth - _elementWidth )) + "px";
      }else{
        _handle.style.left = "0px";
      }
    }