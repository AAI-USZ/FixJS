function blinkTarget( target ){
      if( target !== _media.target ){
        target = butter.getTargetByType( "elementID", target );
        if( target ){
          target.view.blink();
        } //if
      }
      else {
        _media.view.blink();
      } //if
    }