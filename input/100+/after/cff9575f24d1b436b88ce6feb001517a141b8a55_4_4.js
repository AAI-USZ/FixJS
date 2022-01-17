function Horizontal( outerElement, innerElement ){
    var _element = document.createElement( "div" ),
        _handle = document.createElement( "div" ),
        _elementWidth,
        _parentWidth,
        _childWidth,
        _scrollWidth,
        _handleWidth,
        _mousePos = 0,
        _this = this;

    EventManagerWrapper( _this );

    _element.className = "scroll-bar scroll-bar-h";
    _handle.className = "scroll-handle";

    _element.appendChild( _handle );

    function setup(){
      _parentWidth = outerElement.getBoundingClientRect().width;
      _childWidth = innerElement.getBoundingClientRect().width;
      _elementWidth = _element.getBoundingClientRect().width;
      _scrollWidth = innerElement.scrollWidth;
      _handleWidth = _elementWidth - ( _scrollWidth - _parentWidth );
      _handleWidth = Math.max( 20, Math.min( _elementWidth, _handleWidth ) );
      _handle.style.width = _handleWidth + "px";
      setHandlePosition();
    }

    function onMouseUp(){
      window.removeEventListener( "mouseup", onMouseUp, false );
      window.removeEventListener( "mousemove", onMouseMove, false );
      _handle.addEventListener( "mousedown", onMouseDown, false );
    }

    function onMouseMove( e ){
      var diff = e.pageX - _mousePos;
      diff = Math.max( 0, Math.min( diff, _elementWidth - _handleWidth ) );
      _handle.style.left = diff + "px";
      var p = _handle.offsetLeft / ( _elementWidth - _handleWidth );
      outerElement.scrollLeft = ( _scrollWidth - _elementWidth ) * p;
      _this.dispatch( "scroll", outerElement.scrollLeft );
    }

    function onMouseDown( e ){
      if( e.button === 0 ){
        var handleX = _handle.offsetLeft;
        _mousePos = e.pageX - handleX;
        window.addEventListener( "mouseup", onMouseUp, false );
        window.addEventListener( "mousemove", onMouseMove, false );
        _handle.removeEventListener( "mousedown", onMouseDown, false );
      }
    }

    function setHandlePosition(){
      if( _scrollWidth - _elementWidth > 0 ) {
        _handle.style.left = ( _elementWidth - _handleWidth ) *
          ( outerElement.scrollLeft / ( _scrollWidth - _elementWidth ) ) + "px";
      } else {
        _handle.style.left = "0px";
      }
    }

    outerElement.addEventListener( "scroll", function( e ){
      setHandlePosition();
    }, false );

    outerElement.addEventListener( "mousewheel", function( e ){
      if( e.wheelDeltaX ){
        outerElement.scrollLeft -= e.wheelDeltaX;
        setHandlePosition();
        e.preventDefault();
      }
    }, false );

    // For Firefox
    outerElement.addEventListener( "DOMMouseScroll", function( e ){
      if( e.axis === e.HORIZONTAL_AXIS || ( e.axis === e.VERTICAL_AXIS && e.shiftKey )){
        outerElement.scrollLeft += e.detail * 2;
        setHandlePosition();
        e.preventDefault();
      }
    }, false );

    _element.addEventListener( "click", function( e ) {
      // bail early if this event is coming from the handle
      if( e.srcElement === _handle || e.button > 0 ) {
        return;
      }

      var posX = e.pageX,
          handleRect = _handle.getBoundingClientRect(),
          elementRect = _element.getBoundingClientRect(),
          p;

      if( posX > handleRect.right ) {
        _handle.style.left = ( ( posX - elementRect.left ) - _handleWidth ) + "px";
      }
      else if( posX < handleRect.left ) {
        _handle.style.left = posX - elementRect.left + "px";
      }

      p = _handle.offsetLeft / ( _elementWidth - _handleWidth );
      outerElement.scrollLeft = ( _scrollWidth - _elementWidth ) * p;
    }, false);

    window.addEventListener( "resize", setup, false );
    _handle.addEventListener( "mousedown", onMouseDown, false );

    this.update = function(){
      setup();
    };

    setup();

    Object.defineProperties( this, {
      element: {
        enumerable: true,
        get: function(){
          return _element;
        }
      }
    });

  }