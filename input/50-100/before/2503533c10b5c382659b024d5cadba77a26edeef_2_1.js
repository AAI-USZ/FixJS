function ( e ) {
        var trackEvent = e.data;

        var trackEventDoubleClicked = function ( e ) {
          openEditor( trackEvent );
        };

        e.data.view.element.addEventListener( "click", trackEventDoubleClicked, false );

        butter.listen( "trackeventremoved", function ( e ) {
          if ( e.data === trackEvent ) {
            e.data.view.element.removeEventListener( "click", trackEventDoubleClicked, false );
          }
        });

      }