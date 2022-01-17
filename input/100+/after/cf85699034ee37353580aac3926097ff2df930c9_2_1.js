function ( e ) {
        var trackEvent = e.data;

        var trackEventMouseUp = function ( e ) {
          if( butter.selectedEvents.length === 1 && !trackEvent.dragging ){
            openEditor( trackEvent );
          }
        };

        e.data.view.element.addEventListener( "click", trackEventMouseUp, false );

        butter.listen( "trackeventremoved", function ( e ) {
          if ( e.data === trackEvent ) {
            e.data.view.element.removeEventListener( "mouseup", trackEventMouseUp, true );
          }
        });
      }