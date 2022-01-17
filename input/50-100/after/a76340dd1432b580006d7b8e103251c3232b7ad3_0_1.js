function() {

        p.media.removeEventListener( "play", bigPlayClicked, false );
        bigPlayButton.removeEventListener( "mouseup", bigPlayClicked, false );
        bigPlayButton.classList.remove( "controls-ready" );
        p.media.addEventListener( "mouseover", activate, false );
        p.paused && p.play();
      }