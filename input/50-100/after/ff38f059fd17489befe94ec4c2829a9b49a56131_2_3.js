function( widget, value ) {
      var context;
      var detectByKey = org.eclipse.swt.EventUtil.menuDetectedByKey;
      var detectByMouse = org.eclipse.swt.EventUtil.menuDetectedByMouse;
      if( value ) {
        widget.addEventListener( "keydown", detectByKey, context );
        widget.addEventListener( "mouseup", detectByMouse, context );
      } else {
        widget.removeEventListener( "keydown", detectByKey, context );
        widget.removeEventListener( "mouseup", detectByMouse, context );
      }
    }