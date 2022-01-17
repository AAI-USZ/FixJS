function() {

        p.off( "play", bigPlayListener );
        bigPlayButton.classList.remove( "controls-ready" );
        p.media.addEventListener( "mouseover", activate, false );
      }