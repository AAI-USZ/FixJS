function ( e ) {
          if ( e.data === trackEvent ) {
            e.data.view.element.removeEventListener( "mouseup", trackEventClicked, true );
          }
        }