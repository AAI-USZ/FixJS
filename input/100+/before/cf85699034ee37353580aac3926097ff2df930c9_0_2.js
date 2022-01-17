function attachInputChangeHandler ( element, trackEvent, propertyName ) {
      element.addEventListener( "blur", function( e ) {
        var updateOptions = {};
        updateOptions[ propertyName ] = element.value;
        trackEvent.update( updateOptions );
      }, false );
      element.addEventListener( "keyup", function( e ) {
        var updateOptions = {};
        updateOptions[ propertyName ] = element.value;
        trackEvent.update( updateOptions );
      }, false );
    }