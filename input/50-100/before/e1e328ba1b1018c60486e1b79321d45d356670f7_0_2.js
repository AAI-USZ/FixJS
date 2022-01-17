function() {
      elPopcorn.currentTime( popcorn.currentTime() - slideOptions.start );
      elPopcorn.play();
      popcorn.on( "play", onPlay );
      popcorn.on( "pause", onPause );
      popcorn.on( "seeked", onSeeked );
      popcorn.on( "seeking", onSeeking );
    }