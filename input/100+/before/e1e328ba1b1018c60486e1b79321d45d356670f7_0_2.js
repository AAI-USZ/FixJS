function syncVideo( el ) {
    console.log("Setting up synced video.")

    var slideOptions = SlideButterOptions( $( el ).closest( ".slide" )[ 0 ] ),
        elPopcorn = Popcorn( el ),
        wasPlaying = false;

    el.controls = false;
    popcorn.on( "volumechange", onVolumeChange );

    slideOptions.startHandlers.push(function() {
      elPopcorn.currentTime( popcorn.currentTime() - slideOptions.start );
      elPopcorn.play();
      popcorn.on( "play", onPlay );
      popcorn.on( "pause", onPause );
      popcorn.on( "seeked", onSeeked );
      popcorn.on( "seeking", onSeeking );
    });

    slideOptions.endHandlers.push(function() {
      elPopcorn.pause();
      popcorn.off( "play", onPlay );
      popcorn.off( "pause", onPause );
      popcorn.off( "seeked", onSeeked );
      popcorn.off( "seeking", onSeeking );
    });

    function onPlay() {
      elPopcorn.play();
      wasPlaying = true;
    }

    function onPause() {
      elPopcorn.pause();
      wasPlaying = false;
    }

    function onVolumeChange() {
      elPopcorn.volume( popcorn.volume() );
    }

    function onSeeked() {
      elPopcorn.currentTime( popcorn.currentTime() - slideOptions.start );

      if ( wasPlaying ) {
        elPopcorn.play();
      }
    }
    
    function onSeeking() {
      elPopcorn.pause();
    }
  }