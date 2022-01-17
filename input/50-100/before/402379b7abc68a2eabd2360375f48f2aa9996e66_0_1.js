function() {

            if ( p.muted() ) {

              muteButton.classList.remove( "controls-unmuted" );
              muteButton.classList.add( "controls-muted" );
            } else {

              muteButton.classList.remove( "controls-muted" );
              muteButton.classList.add( "controls-unmuted" );
            }
          }