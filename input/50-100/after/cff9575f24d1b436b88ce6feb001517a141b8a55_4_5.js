function onMouseMove( e ){
      var diff = e.pageX - _mousePos;
      diff = Math.max( 0, Math.min( diff, _elementWidth - _handleWidth ) );
      _handle.style.left = diff + "px";
      var p = _handle.offsetLeft / ( _elementWidth - _handleWidth );
      outerElement.scrollLeft = ( _scrollWidth - _elementWidth ) * p;
      _this.dispatch( "scroll", outerElement.scrollLeft );
    }