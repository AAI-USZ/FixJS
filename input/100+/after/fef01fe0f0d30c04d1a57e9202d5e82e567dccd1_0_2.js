function( domEvent ) {
      var target = domEvent.target;
      var result = false;
      if( this._lastMouseClickTarget === target ) {
        var diff = ( ( new Date() ).getTime() ) - this._lastMouseClickTime;
        result = diff < org.eclipse.swt.EventUtil.DOUBLE_CLICK_TIME;
      }
      return result;
    }