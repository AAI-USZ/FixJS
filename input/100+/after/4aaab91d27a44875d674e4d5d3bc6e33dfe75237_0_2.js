function attachStartEndHandler( element, trackEvent, propertyName ) {
      element.addEventListener( "blur", function( e ) {
        var updateOptions = {};
        updateOptions[ propertyName ] = element.value;
        updateTrackEventWithTryCatch( trackEvent, updateOptions );
      }, false );
      element.addEventListener( "keyup", function( e ) {
        var value = element.value.replace( /\s/g, "" );
        if ( value && value.length > 0 ) {
          var updateOptions = {};
          updateOptions[ propertyName ] = value;
          updateTrackEventWithTryCatch( trackEvent, updateOptions );
        }
      }, false );
    }