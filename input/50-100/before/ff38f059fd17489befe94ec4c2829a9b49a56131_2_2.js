function( widget, value ) {
      var context = undefined;
      var mouseDown = org.eclipse.swt.EventUtil.mouseDown;
      var mouseUp = org.eclipse.swt.EventUtil.mouseUp;
      if( value ) {
        widget.addEventListener( "mousedown", mouseDown, context );
        widget.addEventListener( "mouseup", mouseUp, context );
      } else {
        widget.removeEventListener( "mousedown", mouseDown, context );
        widget.removeEventListener( "mouseup", mouseUp, context );
      }
    }