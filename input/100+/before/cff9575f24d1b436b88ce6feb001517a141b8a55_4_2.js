function Vertical( outerElement, innerElement ){
    var _element = document.createElement( "div" ),
        _handle = document.createElement( "div" ),
        _elementHeight,
        _parentHeight,
        _childHeight,
        _scrollHeight,
        _handleHeight,
        _mousePos = 0,
        _this = this;

    EventManagerWrapper( _this );

    _element.className = "scroll-bar scroll-bar-v";
    _handle.className = "scroll-handle";

    _element.appendChild( _handle );

    function setup(){
      _parentHeight = outerElement.getBoundingClientRect().height;
      _childHeight = innerElement.getBoundingClientRect().height;
      _elementHeight = _element.getBoundingClientRect().height;
      _scrollHeight = outerElement.scrollHeight;
      _handleHeight = _elementHeight - ( _scrollHeight - _parentHeight ) / VERTICAL_SIZE_REDUCTION_FACTOR;
      _handleHeight = Math.max( 20, Math.min( _elementHeight, _handleHeight ) );
      _handle.style.height = _handleHeight + "px";
      setHandlePosition();
    } //setup

    function onMouseUp(){
      window.removeEventListener( "mouseup", onMouseUp, false );
      window.removeEventListener( "mousemove", onMouseMove, false );
      _handle.addEventListener( "mousedown", onMouseDown, false );
    } //onMouseUp

    function onMouseMove( e ){
      var diff = e.pageY - _mousePos,
          maxDiff = _elementHeight - _handleHeight;
      diff = Math.max( 0, Math.min( diff, maxDiff ) );
      var p = diff / maxDiff;
      _handle.style.top = diff + "px";
      outerElement.scrollTop = ( _scrollHeight - _parentHeight ) * p;
      _this.dispatch( "scroll", outerElement.scrollTop );
    } //onMouseMove

    function onMouseDown( e ){
      if( e.button === 0 ){
        var handleY = _handle.offsetTop;
        _mousePos = e.pageY - handleY;
        window.addEventListener( "mouseup", onMouseUp, false );
        window.addEventListener( "mousemove", onMouseMove, false );
        _handle.removeEventListener( "mousedown", onMouseDown, false );
      } //if
    } //onMouseDown

    this.update = function(){
      setup();
    }; //update

    function setHandlePosition(){
      if( innerElement.scrollHeight - _elementHeight > 0 ) {
        _handle.style.top = ( _elementHeight - _handleHeight ) *
          ( outerElement.scrollTop / ( outerElement.scrollHeight - _elementHeight ) ) + "px";
      }else{
        _handle.style.top = "0px";
      }
    }

    innerElement.addEventListener( "scroll", function( e ){
      setHandlePosition();
    }, false );

    innerElement.addEventListener( "mousewheel", function( e ){
      if( e.wheelDeltaY ){
        outerElement.scrollTop -= e.wheelDeltaY;
        setHandlePosition();
        e.preventDefault();
      }
    }, false );

    // For Firefox
    innerElement.addEventListener( "DOMMouseScroll", function( e ){
      if( e.axis === e.VERTICAL_AXIS && !e.shiftKey ){
        innerElement.scrollTop += e.detail * 2;
        setHandlePosition();
        e.preventDefault();
      }
    }, false );

    _element.addEventListener( "click", function( e ) {
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
      innerElement.scrollTop = ( _scrollHeight - _elementHeight ) * p;
    }, false);

    window.addEventListener( "resize", setup, false );
    _handle.addEventListener( "mousedown", onMouseDown, false );

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