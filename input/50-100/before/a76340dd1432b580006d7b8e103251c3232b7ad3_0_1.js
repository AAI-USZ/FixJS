function() {

        bigPlayButton.removeEventListener( "mouseup", bigPlayClicked, false );
        bigPlayButton.classList.remove( "controls-ready" );
        p.media.addEventListener( "mouseover", activate, false );
        p.play();
      }