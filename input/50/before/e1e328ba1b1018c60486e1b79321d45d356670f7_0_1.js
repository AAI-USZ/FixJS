function() {
      elPopcorn.pause();
      popcorn.off( "play", onPlay );
      popcorn.off( "pause", onPause );
      popcorn.off( "seeked", onSeeked );
      popcorn.off( "seeking", onSeeking );
    }