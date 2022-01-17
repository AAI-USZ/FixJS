function( widget, value ) {
      var context = undefined;
      var helpRequested = org.eclipse.swt.EventUtil.helpRequested;
      if( value ) {
        widget.addEventListener( "keydown", helpRequested, context );
      } else {
        widget.removeEventListener( "keydown", helpRequested, context );
      }
    }