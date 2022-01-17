function( e ) {
        var updateOptions = {};
        updateOptions[ propertyName ] = element.value;
        trackEvent.update( updateOptions );
        var target = _this.butter.getTargetByType( "elementID", trackEvent.popcornOptions.target );
        if( target ) {
          target.view.blink();
        }
      }