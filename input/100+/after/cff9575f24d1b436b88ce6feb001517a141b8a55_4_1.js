function( e ) {
      // bail early if this event is coming from the handle
      if( e.srcElement === _handle || e.button > 0 ) {
        return;
      }

      var posY = e.pageY,
          handleRect = _handle.getBoundingClientRect(),
          elementRect = _element.getBoundingClientRect(),
          p;

      if( posY > handleRect.bottom ) {
        _handle.style.top = ( ( posY - elementRect.top ) - _handleHeight ) + "px";
      } else if( posY < handleRect.top ) {
        _handle.style.top = posY - elementRect.top + "px";
      }

      p = _handle.offsetTop / ( _elementHeight - _handleHeight );
      outerElement.scrollTop = ( _scrollHeight - _elementHeight ) * p;
    }