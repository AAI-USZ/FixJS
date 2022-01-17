function ( e ) {
        var trackEvent = e.data;

        var trackEventClicked = function ( e ) {
          openEditor( trackEvent );
        };

        e.data.view.element.addEventListener( "mouseup", trackEventClicked, true );

        butter.listen( "trackeventremoved", function ( e ) {
          if ( e.data === trackEvent ) {
            e.data.view.element.removeEventListener( "mouseup", trackEventClicked, true );
          }
        });

      }