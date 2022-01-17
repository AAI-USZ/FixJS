function( domEvent ) {
      var touch = domEvent.touches.item( 0 );
      if( touch === null ) {
        // Should happen at touchend (behavior seems unpredictable)
        touch = domEvent.changedTouches.item( 0 );
      }
      return touch;
    }