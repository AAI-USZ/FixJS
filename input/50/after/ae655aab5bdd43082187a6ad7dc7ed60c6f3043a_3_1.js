function( trackEvent ){
        if ( !trackEvent || !( trackEvent instanceof TrackEvent ) ){
          throw new Error( "trackEvent must be valid to start an editor." );
        }
        return openEditor( trackEvent );
      }