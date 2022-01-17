function( e ) {

        e.preventDefault();
        seeking = true;
        playStateCache = !p.paused();
        p.pause();
        window.addEventListener( "mouseup", mouseUp, false );
        window.addEventListener( "mousemove", mouseMove, false );

        if ( progressBar ) {

          progressBar.style.width = e.layerX + "px";
        }

        if ( scrubber ) {

          scrubber.style.left = e.layerX - ( scrubber.offsetWidth / 2 ) + "px";
        }

        p.currentTime( e.layerX / timebar.offsetWidth * 100 * p.duration() / 100 );
      }